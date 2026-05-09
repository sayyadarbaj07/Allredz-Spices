import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { useGetProductByIdQuery } from "../redux/Api/productAPi";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import hero from "../assets/hero.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <div className="w-20 h-20 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] space-y-6">
        <h2 className="text-3xl font-heading font-black text-gray-900">Spice not found.</h2>
        <button onClick={() => navigate("/products")} className="premium-button bg-brand-red text-white">Back to Collection</button>
      </div>
    );
  }

  const activePrice = selectedSize?.price || product.sizes?.[0]?.price || 0;

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/20 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-[120px] -z-10" />

      <div className="section-container">
        <button 
          onClick={() => navigate("/products")}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-red transition-all mb-12"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Showcase */}
          <m.div 
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative aspect-square sm:aspect-[4/5] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden bg-white shadow-2xl group border-8 border-white"
          >
            <img 
              src={product.image?.startsWith("/uploads/") ? `${import.meta.env.VITE_API_URL || ""}${product.image}` : product.image || hero} 
              alt={product.name} 
              className="w-full h-full object-contain p-12 group-hover:scale-110 transition-transform duration-[3s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            
            {/* Organic Badge */}
            <div className="absolute top-10 left-10 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20">
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">100% Pure & Organic</span>
            </div>
          </m.div>

          {/* Product Info */}
          <m.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <div className="space-y-6">
              <m.div variants={fadeUp} className="flex items-center gap-4">
                 <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                 </div>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">4.9 (120+ Reviews)</span>
              </m.div>

              <div className="space-y-2">
                <m.span variants={fadeUp} className="cinematic-heading text-red-800 text-xs">Aromatic Heritage</m.span>
                <m.h1 variants={fadeUp} className="text-5xl md:text-7xl font-heading font-black text-gray-900 leading-tight tracking-tight">
                  {product.name}
                </m.h1>
              </div>

              <m.p variants={fadeUp} className="text-xl text-gray-600 font-body leading-relaxed italic">
                {product.description}
              </m.p>
            </div>

            <m.div variants={fadeUp} className="space-y-6">
               <div className="flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-heading font-black text-brand-red italic">₹{activePrice}</span>
                  <span className="text-xs text-gray-400 line-through">₹{activePrice + 40}</span>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Select Net Weight</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes?.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                          (selectedSize?.size === size.size || (!selectedSize && idx === 0))
                            ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20"
                            : "bg-white border-gray-100 text-gray-400 hover:border-brand-red/30"
                        }`}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
               </div>
            </m.div>

            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
               <button className="premium-button flex-1 bg-brand-red text-white hover:bg-gray-900 group">
                  <ShoppingCart size={16} className="mr-3 group-hover:-translate-y-1 transition-transform" />
                  Add to Cart
               </button>
               <button className="premium-button flex-1 border-2 border-gray-100 text-gray-400 hover:border-brand-red hover:text-brand-red">
                  Wishlist
               </button>
            </m.div>

            {/* Trust Badges */}
            <m.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
               {[
                 { icon: ShieldCheck, label: "Pure & Safe" },
                 { icon: Truck, label: "Fast Delivery" },
                 { icon: RotateCcw, label: "7 Day Return" }
               ].map((badge, i) => (
                 <div key={i} className="flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-red">
                       <badge.icon size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{badge.label}</span>
                 </div>
               ))}
            </m.div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

