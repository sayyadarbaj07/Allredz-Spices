import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration & Constants ---
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";
const BACKEND_URL = `${import.meta.env.VITE_API_URL || ""}/api/order`;

// PREMIUM INPUT CLASS (Crystal Clean Design)
const PREMIUM_INPUT_CLASS =
  "w-full bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-inner transition duration-300 ease-in-out placeholder-gray-400 text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100";

// --- Checkout Component ---
const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const token = localStorage.getItem("token");

  // Helper function to handle address input changes
  const handleAddressChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  // Load cart & redirect
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    if (!saved.length) {
      navigate("/");
      return;
    }
    const updated = saved.map((it) => ({
      ...it,
      selectedPrice: it.selectedPrice || (it.sizes && it.sizes[0]?.price) || 0,
      selectedWeight:
        it.selectedWeight || (it.sizes && it.sizes[0]?.weight) || "NA",
      image: it.image || "/placeholder.png",
    }));
    setCart(updated);
    setCartCount(updated.reduce((s, i) => s + (i.quantity || 1), 0));
  }, [navigate, token]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const updateQuantity = (id, delta) => {
    const updated = cart.map((it) =>
      it._id === id
        ? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) }
        : it
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartCount(updated.reduce((s, i) => s + (i.quantity || 1), 0));
    showToast("Cart updated");
  };

  const removeItem = (id) => {
    const updated = cart.filter((it) => it._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartCount(updated.reduce((s, i) => s + (i.quantity || 1), 0));
    showToast("Item removed");
    if (!updated.length) navigate("/");
  };

  const totalPrice = cart.reduce(
    (sum, it) => sum + (it.selectedPrice || 0) * (it.quantity || 1),
    0
  );

  const mapCartForBackend = () =>
    cart.map((item) => ({
      product: item._id,
      size: { weight: item.selectedWeight, price: item.selectedPrice },
      qty: item.quantity || 1,
    }));

  const validateAddress = () => {
    const { name, email, phone, street, city, state, pincode } = address;
    if (!name || !email || !phone || !street || !city || !state || !pincode) {
      showToast("Please fill all address fields");
      return false;
    }
    return true;
  };

  const buildShippingAddress = () => ({
    fullName: address.name,
    phone: address.phone,
    pincode: address.pincode,
    address: address.street,
    city: address.city,
    state: address.state,
  });

  const handleOrderSuccess = () => {
    showToast("Order placed successfully");
    localStorage.removeItem("cart");
    setCart([]);
    setCartCount(0);
    setTimeout(() => navigate("/order-success"), 1000);
  };

  const handlePayment = async () => {
    if (!cart.length) return showToast("Cart is empty");
    if (!validateAddress()) return;
    if (totalPrice === 0) return showToast("Total price is zero.");

    setLoading(true);
    try {
      const endpoint = paymentMethod === "COD" ? "create-cod" : "create-online";
      const res = await fetch(`${BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: mapCartForBackend(),
          totalAmount: totalPrice,
          shippingAddress: buildShippingAddress(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Server error");
        setLoading(false);
        return;
      }

      if (paymentMethod === "COD") {
        setLoading(false);
        return handleOrderSuccess();
      }

      // --- Razorpay Online Payment Flow ---
      const orderPayload = data.order || data;
      const rpOrder =
        data.razorpayOrder ||
        data.razorpay_order ||
        data.order?.razorpayOrderId;

      if (!rpOrder && !data.razorpayOrder) {
        showToast("Payment setup failed, try again");
        setLoading(false);
        return;
      }

      const razorpayOrder =
        data.razorpayOrder ||
        (rpOrder.id
          ? rpOrder
          : { id: rpOrder, amount: orderPayload?.totalAmount * 100 });

      const options = {
        key: RAZORPAY_KEY,
        amount: razorpayOrder.amount || orderPayload.totalAmount * 100,
        currency: "INR",
        name: "Allredz Masala",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${BACKEND_URL}/complete-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderId: orderPayload._id,
                paymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              showToast(verifyData.message || "Payment verification failed");
            } else {
              handleOrderSuccess();
            }
          } catch (err) {
            console.error("Verification error:", err);
            showToast("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: { color: "#dc2626" }, // Tailwind red-600
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        showToast("Payment failed: " + response.error.reason);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      showToast("Something went wrong. Try again");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      {/* Title Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center lg:text-left">
        <span role="img" aria-label="shield">
          🛡️
        </span>{" "}
        Secure Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Cart + Address */}
        <div className="lg:w-2/3 space-y-8">
          {/* Cart Items List */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 bg-red-50 border-b border-red-100">
              <h2 className="text-2xl font-bold text-red-700">
                1. Review Your Order ({cartCount})
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item._id + item.selectedWeight}
                  className="flex items-center justify-between p-3 bg-white rounded-xl shadow-md border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border p-1 bg-gray-50"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.selectedWeight}
                      </p>
                    </div>
                  </div>

                  {/* Price and Controls */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="p-2 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                        disabled={(item.quantity || 1) <= 1}
                        aria-label="Decrease quantity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          ></path>
                        </svg>
                      </button>
                      <span className="w-8 text-center text-base font-medium text-gray-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="p-2 text-red-600 hover:bg-red-100 transition"
                        aria-label="Increase quantity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="text-right w-20">
                      <p className="text-xl font-bold text-red-700">
                        ₹{item.selectedPrice * (item.quantity || 1)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-400 hover:text-red-700 transition ml-2"
                      aria-label="Remove item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
              2. Shipping Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleAddressChange}
                placeholder="Full Name *"
                className={PREMIUM_INPUT_CLASS}
                required
              />
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleAddressChange}
                placeholder="Email Address *"
                className={PREMIUM_INPUT_CLASS}
                required
              />
              <input
                type="tel"
                name="phone"
                value={address.phone}
                onChange={handleAddressChange}
                placeholder="Phone Number *"
                className={PREMIUM_INPUT_CLASS}
                required
              />
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                placeholder="Pincode *"
                className={PREMIUM_INPUT_CLASS}
                required
              />
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                placeholder="Flat, House No., Building, Street Name *"
                className={`${PREMIUM_INPUT_CLASS} md:col-span-2`}
                required
              />
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City *"
                className={PREMIUM_INPUT_CLASS}
                required
              />
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="State *"
                className={PREMIUM_INPUT_CLASS}
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column: Summary & Payment */}
        <aside className="lg:w-1/3 space-y-6">
          {/* Payment Method */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-3">
              3. Payment Method
            </h3>
            <div className="flex flex-col space-y-3">
              <label
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "COD"
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-red-600 h-5 w-5 focus:ring-red-500"
                />
                <span className="font-semibold text-gray-800">
                  Cash on Delivery
                </span>
              </label>

              <label
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === "ONLINE"
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-red-600 h-5 w-5 focus:ring-red-500"
                />
                <span className="font-semibold text-gray-800">
                  Pay Online (Razorpay)
                </span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:sticky lg:top-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-2xl text-red-700 mb-4 border-b pb-3">
              Order Summary
            </h3>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2">
              {cart.map((it) => (
                <div
                  key={it._id + it.selectedWeight}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {it.name} x {it.quantity || 1}
                  </span>
                  <span className="font-medium text-gray-800">
                    ₹{(it.selectedPrice || 0) * (it.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-extrabold text-2xl pt-4 border-t-2 border-dashed border-gray-200 mt-4">
              <span>Grand Total</span>
              <span className="text-red-700">₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : paymentMethod === "COD"
                  ? "Place Order (COD)"
                  : "Pay Online"}
            </button>
          </motion.div>
        </aside>
      </div>

      {/* Toast Message */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
