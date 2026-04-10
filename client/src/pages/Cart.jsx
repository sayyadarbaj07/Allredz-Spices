import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft, ArrowRight } from "lucide-react";
import hero from "../assets/masala.png";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Update localStorage whenever cartItems change
  const updateCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
    // Trigger storage event for Navbar to update
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id, weight) => {
    const newItems = cartItems.filter(item => !(item._id === id && item.selectedWeight === weight));
    updateCart(newItems);
  };

  const updateQuantity = (id, weight, delta) => {
    const newItems = cartItems.map(item => {
      if (item._id === id && item.selectedWeight === weight) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(newItems);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <ShoppingBag className="text-[#8b1c1c]" size={32} />
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1 font-medium">{cartItems.length} items in your bag</p>
          </div>
          <Link to="/products" className="text-[#8b1c1c] font-bold flex items-center gap-2 hover:underline">
            <ChevronLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 p-16 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Explore our authentic masalas!</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#8b1c1c] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#7a1818] transition-all shadow-lg shadow-red-900/10"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedWeight}`}
                  className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow group"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 flex-shrink-0">
                    <img
                      src={item.image || hero}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{item.name}</h2>
                    <p className="text-gray-500 text-sm font-medium mt-1">Weight: <span className="text-[#8b1c1c]">{item.selectedWeight}</span></p>
                    <div className="mt-4 flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.selectedWeight, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-400 hover:text-[#8b1c1c] transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.selectedWeight, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-400 hover:text-[#8b1c1c] transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right flex flex-col items-center sm:items-end justify-between self-stretch">
                    <p className="text-xl font-black text-gray-900">₹{item.selectedPrice * item.quantity}</p>
                    <button
                      onClick={() => removeItem(item._id, item.selectedWeight)}
                      className="text-gray-300 hover:text-red-500 transition-colors mt-4 sm:mt-0"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 p-8 border border-gray-100 sticky top-28">
                <h2 className="text-xl font-black text-gray-900 mb-6 pb-6 border-b border-gray-100">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-10 pt-6 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Estimated Total</span>
                  <span className="text-3xl font-black text-[#8b1c1c]">₹{total}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#8b1c1c] text-white font-bold py-5 rounded-2xl shadow-lg shadow-red-900/10 hover:bg-[#7a1818] transition-all flex items-center justify-center gap-3 text-lg group"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="mt-6 text-center text-xs text-gray-400 font-medium px-4">
                  By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
