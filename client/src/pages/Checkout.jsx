import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Truck, 
  Info, 
  ArrowRight, 
  Phone, 
  Mail, 
  User,
  Plus,
  Minus,
  Trash2,
  Sparkles
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";
const BACKEND_URL = `${import.meta.env.VITE_API_URL || ""}/api/order`;

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
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
  const { fadeUp, staggerContainer, scaleIn } = useScrollAnimation();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    if (!saved.length) {
      navigate("/");
      return;
    }
    setCart(saved);
  }, [navigate]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const totalPrice = cart.reduce((sum, it) => sum + (it.selectedPrice || 0) * (it.quantity || 1), 0);

  const handleOrderSuccess = () => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
    navigate("/order-success");
  };

  const handlePayment = async () => {
    if (!token) return showToast("Please login to proceed.");
    const { name, email, phone, street, city, state, pincode } = address;
    if (!name || !email || !phone || !street || !city || !state || !pincode) return showToast("Complete your distribution address.");

    setLoading(true);
    try {
      const endpoint = paymentMethod === "COD" ? "create-cod" : "create-online";
      const res = await fetch(`${BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: cart.map(i => ({ product: i._id, size: { weight: i.selectedWeight, price: i.selectedPrice }, qty: i.quantity })),
          totalAmount: totalPrice,
          shippingAddress: { fullName: name, phone, pincode, address: street, city, state },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Vault connection failed");

      if (paymentMethod === "COD") return handleOrderSuccess();

      // Razorpay Online Flow
      const options = {
        key: RAZORPAY_KEY,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "Allredz Spices",
        description: "Premium Curation Payment",
        order_id: data.razorpayOrder.id,
        handler: async (response) => {
          const vRes = await fetch(`${BACKEND_URL}/complete-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ orderId: data.order._id, ...response }),
          });
          if (vRes.ok) handleOrderSuccess();
          else showToast("Verification failed.");
        },
        prefill: { name: address.name, email: address.email, contact: address.phone },
        theme: { color: "#D32F2F" },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-24 px-6 font-body overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/10 rounded-full blur-[150px] -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto">
        <m.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Finalizing Acquisition</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-gray-900 tracking-tight">
            Secure <span className="italic text-brand-red glow-text">Distribution</span>
          </h1>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side */}
          <m.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-8 space-y-12">
            {/* Step 1: Destination */}
            <m.section variants={fadeUp} className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center font-heading font-black shadow-xl shadow-brand-red/20">1</div>
                  <h2 className="text-2xl font-heading font-black text-gray-900 tracking-tight flex items-center gap-3">
                     Distribution Address <MapPin size={20} className="text-brand-red" />
                  </h2>
               </div>
               
               <div className="luxury-card bg-white p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.02)]">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Full Name</label>
                    <input name="name" value={address.name} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10" placeholder="Identity of Patron" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Secure Email</label>
                    <input name="email" value={address.email} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10" placeholder="Communication Node" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Contact Number</label>
                    <input name="phone" value={address.phone} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10" placeholder="+91 00000 00000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Distribution Key (Pincode)</label>
                    <input name="pincode" value={address.pincode} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10" placeholder="000 000" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Full Terrain Address</label>
                    <textarea name="street" value={address.street} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10 h-32 resize-none" placeholder="Flat, Building, Street Details..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">City</label>
                    <input name="city" value={address.city} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10" placeholder="Urban Center" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">State</label>
                    <input name="state" value={address.state} onChange={handleAddressChange} className="premium-input bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold w-full outline-none focus:ring-2 focus:ring-brand-red/10" placeholder="Region" />
                  </div>
               </div>
            </m.section>

            {/* Step 2: Payment */}
            <m.section variants={fadeUp} className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center font-heading font-black shadow-xl shadow-brand-red/20">2</div>
                  <h2 className="text-2xl font-heading font-black text-gray-900 tracking-tight flex items-center gap-3">
                     Acquisition Method <CreditCard size={20} className="text-brand-red" />
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: "COD", label: "Cash on Delivery", desc: "Settlement upon arrival", icon: Truck },
                    { id: "ONLINE", label: "Quantum Payment", desc: "Razorpay Secure Encryption", icon: ShieldCheck }
                  ].map(method => (
                    <div key={method.id} onClick={() => setPaymentMethod(method.id)} className={`luxury-card p-8 cursor-pointer transition-all duration-500 flex items-start gap-6 relative overflow-hidden ${paymentMethod === method.id ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20 ring-2 ring-brand-red ring-offset-4 ring-offset-[#faf9f6]' : 'bg-white text-gray-900 hover:shadow-lg'}`}>
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'bg-brand-red text-white' : 'bg-gray-50 text-gray-400 group-hover:text-brand-red'}`}>
                          <method.icon size={20} />
                       </div>
                       <div className="space-y-1">
                          <h3 className="font-heading font-black tracking-tight">{method.label}</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{method.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </m.section>
          </m.div>

          {/* Summary Side */}
          <aside className="lg:col-span-4 space-y-8 sticky top-32">
             <m.div variants={fadeUp} className="luxury-card bg-gray-900 p-10 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-10">
                   <div className="space-y-2 border-b border-white/10 pb-6">
                      <h3 className="text-2xl font-heading font-black tracking-tight">Manifest Summary</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">Curated Spice Batch</p>
                   </div>

                   <div className="space-y-6 max-h-60 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-red/20">
                      {cart.map(item => (
                        <div key={item._id + item.selectedWeight} className="flex justify-between items-start gap-4">
                           <div className="space-y-1 flex-1">
                              <p className="text-sm font-bold text-white leading-tight">{item.name}</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.selectedWeight} × {item.quantity}</p>
                           </div>
                           <p className="text-sm font-heading font-black text-brand-red">₹{item.selectedPrice * item.quantity}</p>
                        </div>
                      ))}
                   </div>

                   <div className="pt-8 border-t border-white/10 space-y-6">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>Logistics Fee</span>
                         <span className="text-emerald-500">Free Distribution</span>
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-sm font-heading font-black tracking-widest uppercase text-brand-red">Total Worth</span>
                         <span className="text-4xl font-heading font-black tracking-tighter text-white">₹{totalPrice}</span>
                      </div>
                   </div>

                   <button onClick={handlePayment} disabled={loading} className="premium-button w-full bg-brand-red text-white py-6 hover:bg-white hover:text-gray-900 group shadow-2xl shadow-brand-red/20 disabled:opacity-50">
                     {loading ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" /> : <span className="flex items-center gap-3 justify-center">Complete Acquisition <Sparkles size={18} className="ml-3 group-hover:scale-125 transition-transform" /></span>}
                   </button>
                </div>
             </m.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
