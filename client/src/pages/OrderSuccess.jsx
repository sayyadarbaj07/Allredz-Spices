import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, m, AnimatePresence } from "framer-motion";
import { CheckCircle, ShoppingBag, LayoutDashboard, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL || ""}/api/order/my-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setOrder(data[data.length - 1]);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] p-6 relative overflow-hidden">
      {/* Cinematic Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/20 rounded-full blur-[150px] -z-10 animate-pulse-glow" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-[120px] -z-10" />

      <m.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="luxury-card max-w-lg w-full bg-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red via-yellow-400 to-brand-red" />
        
        {/* Success Header */}
        <div className="p-10 md:p-12 text-center space-y-8 border-b border-gray-50">
          <m.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative"
          >
            <CheckCircle size={48} />
            <m.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 rounded-full bg-brand-red"
            />
          </m.div>

          <div className="space-y-4">
            <m.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="cinematic-heading text-red-800 text-xs tracking-[0.4em]"
            >
              Order Confirmed
            </m.span>
            <m.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl font-heading font-black text-gray-900 leading-tight"
            >
              Taste is on the <span className="italic text-brand-red glow-text">Way</span>
            </m.h1>
            <m.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 font-body text-base max-w-xs mx-auto"
            >
              Your curated spice collection has been successfully reserved.
            </m.p>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-10 md:p-12 bg-gray-50/30">
          {order && order.items?.length > 0 ? (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Order Digest</h2>
                <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">#{order._id?.slice(-8).toUpperCase()}</span>
              </div>
              
              <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {(order.items || []).map((item, idx) => (
                  <m.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex justify-between items-center group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-heading font-bold text-gray-800 group-hover:text-brand-red transition-colors">
                        {item.product?.name || "Premium Spice Blend"}
                      </span>
                      <span className="text-[9px] font-body font-black uppercase tracking-widest text-gray-400">
                        Qty: {item.qty || 0}
                      </span>
                    </div>
                    <span className="text-sm font-heading font-black text-gray-900">
                      ₹{(item.size?.price || 0) * (item.qty || 0)}
                    </span>
                  </m.div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Total Investment</span>
                <span className="text-2xl font-heading font-black text-brand-red">₹{order.totalAmount || 0}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <m.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-dashed border-brand-red/20 rounded-full mx-auto mb-6"
              />
              <p className="text-gray-400 font-body text-sm italic">🎉 Crafting your aromatic journey...</p>
            </div>
          )}

          <div className="mt-12 space-y-4">
            <button
              onClick={() => navigate("/")}
              className="premium-button w-full bg-brand-red text-white hover:bg-gray-900 group"
            >
              Back to Store <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/user-dashboard")}
              className="w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-red transition-colors flex items-center justify-center gap-3"
            >
              <LayoutDashboard size={14} /> My Dashboard
            </button>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-red/5 to-transparent pointer-events-none" />
      </m.div>
    </div>
  );
};

export default OrderSuccess;

