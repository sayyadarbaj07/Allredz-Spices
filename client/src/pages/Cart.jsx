import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft, ArrowRight, Sparkles, CreditCard, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import hero from "../assets/masala.png";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { fadeUp, staggerContainer, scaleIn } = useScrollAnimation();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
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
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-24 px-6 font-body overflow-hidden relative">
      {/* Cinematic Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/10 rounded-full blur-[150px] -z-10 animate-pulse-glow" />
      
      <div className="max-w-6xl mx-auto">
        <m.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Your Selection</span>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-gray-900 tracking-tight flex items-center gap-6">
               Aromatic <span className="italic text-brand-red glow-text">Basket</span>
            </h1>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">{cartItems.length} curated treasures</p>
          </div>
          <Link to="/products" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-red transition-all">
            <ChevronLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to Collection
          </Link>
        </m.div>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <m.div 
              key="empty"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="luxury-card bg-white p-20 text-center relative overflow-hidden"
            >
              <div className="relative z-10 space-y-8">
                 <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-gray-200">
                    <ShoppingBag size={48} strokeWidth={1} />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-3xl font-heading font-black text-gray-900">Your basket is resting.</h2>
                    <p className="text-sm text-gray-400 font-body italic max-w-sm mx-auto leading-relaxed">
                       The finest spices in the world are waiting to be part of your next culinary masterpiece.
                    </p>
                 </div>
                 <button
                   onClick={() => navigate("/products")}
                   className="premium-button bg-brand-red text-white"
                 >
                   Begin Curation
                 </button>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-50" />
            </m.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Items List */}
              <m.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2 space-y-6"
              >
                {cartItems.map((item, idx) => (
                  <m.div
                    key={`${item._id}-${item.selectedWeight}`}
                    variants={fadeUp}
                    className="luxury-card bg-white p-8 flex flex-col md:flex-row items-center gap-10 group hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="w-32 h-32 bg-[#faf9f6] rounded-[2.5rem] flex items-center justify-center p-6 shrink-0 group-hover:scale-105 transition-transform duration-700 relative overflow-hidden">
                      <img
                        src={item.image || hero}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                      />
                      <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">{item.selectedWeight}</p>
                          <h2 className="text-2xl font-heading font-black text-gray-900 tracking-tight leading-none">{item.name}</h2>
                       </div>
                       
                       <div className="flex items-center justify-center md:justify-start gap-8">
                          <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                             <button
                               onClick={() => updateQuantity(item._id, item.selectedWeight, -1)}
                               className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-brand-red transition-all"
                             >
                               <Minus size={14} />
                             </button>
                             <span className="w-12 text-center font-black text-gray-900 text-sm tracking-tight">{item.quantity}</span>
                             <button
                               onClick={() => updateQuantity(item._id, item.selectedWeight, 1)}
                               className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-brand-red transition-all"
                             >
                               <Plus size={14} />
                             </button>
                          </div>
                          
                          <div className="h-8 w-[1px] bg-gray-100" />
                          
                          <button
                            onClick={() => removeItem(item._id, item.selectedWeight)}
                            className="p-3 bg-red-50 text-red-300 hover:text-red-500 hover:bg-red-100 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                       </div>
                    </div>

                    {/* Price */}
                    <div className="text-center md:text-right shrink-0">
                       <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Batch Value</p>
                       <p className="text-3xl font-heading font-black text-gray-900 leading-none tracking-tight">₹{item.selectedPrice * item.quantity}</p>
                    </div>
                  </m.div>
                ))}
              </m.div>

              {/* Summary Card */}
              <m.div 
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-1 sticky top-32"
              >
                <div className="luxury-card bg-gray-900 p-10 text-white relative overflow-hidden group shadow-2xl">
                   <div className="relative z-10 space-y-10">
                      <div className="space-y-2">
                         <h2 className="text-2xl font-heading font-black tracking-tight">Investment Summary</h2>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red">Allredz Premium Vault</p>
                      </div>

                      <div className="space-y-6">
                         <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                            <span>Product Value</span>
                            <span className="text-white">₹{total}</span>
                         </div>
                         <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                            <span>Distribution Fee</span>
                            <span className="text-emerald-500 italic">Curating...</span>
                         </div>
                         <div className="h-[1px] bg-white/10" />
                         <div className="flex justify-between items-end">
                            <span className="text-sm font-heading font-black tracking-widest uppercase text-brand-red">Total Worth</span>
                            <span className="text-4xl font-heading font-black tracking-tighter text-white">₹{total}</span>
                         </div>
                      </div>

                      <div className="space-y-4 pt-4">
                         <button
                           onClick={() => navigate("/checkout")}
                           className="premium-button w-full bg-brand-red text-white py-6 hover:bg-white hover:text-gray-900 group shadow-2xl shadow-brand-red/20"
                         >
                           Acquire Treasury <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                         </button>
                         
                         <div className="flex items-center justify-center gap-4 text-gray-500 text-[9px] font-black uppercase tracking-widest italic">
                            <ShieldCheck size={12} /> SSL Secure Authentication
                         </div>
                      </div>
                   </div>

                   {/* Abstract Decor */}
                   <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-transparent opacity-50" />
                </div>
                
                <div className="mt-8 luxury-card bg-white p-6 flex items-center gap-4 shadow-sm border border-gray-100">
                   <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                      <CreditCard size={18} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-tight">
                      Express Indian <br /> Distribution Channels
                   </p>
                </div>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;
