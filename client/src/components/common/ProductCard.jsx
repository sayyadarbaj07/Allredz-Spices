import React, { useState, useCallback } from "react";
import { motion, m } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";

const ProductCard = ({ product, hero, onAddToCart, variants }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
  }, [product, selectedSize, onAddToCart]);

  const handleSizeChange = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  return (
    <m.div
      variants={variants}
      className="group relative flex flex-col w-full max-w-sm mx-auto md:max-w-none"
    >
      <div className="luxury-card h-full flex flex-col bg-white border-none shadow-[0_15px_40px_rgba(0,0,0,0.04)] group-hover:shadow-[0_30px_70px_rgba(139,28,28,0.12)] transition-all duration-700">
        {/* Image Area */}
        <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-gray-50/50 flex items-center justify-center p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <img
            src={
              product.image?.startsWith("/uploads/")
                ? `${import.meta.env.VITE_API_URL || ""}${product.image}`
                : product.image || hero
            }
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-20">
            <button className="w-12 h-12 rounded-full bg-white text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
              <Eye size={20} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-white text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-150"
            >
              <ShoppingCart size={20} />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-white/90 backdrop-blur-md text-brand-red px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
              {product.category || "Organic"}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col flex-grow space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h3 className="text-2xl font-heading font-black text-gray-900 group-hover:text-brand-red transition-colors duration-500 line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-sm text-gray-400 font-body leading-relaxed line-clamp-2">
            {product.description || "Indulge in the aromatic essence of our masterfully blended traditional spices."}
          </p>

          <div className="pt-4 border-t border-gray-50 space-y-6">
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.weight}
                  onClick={() => handleSizeChange(s)}
                  className={`py-2 px-4 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-500 border-2 ${selectedSize.weight === s.weight
                    ? "border-brand-red bg-brand-red text-white shadow-lg"
                    : "border-gray-50 bg-gray-50 text-gray-400 hover:border-brand-red/20 hover:text-brand-red"
                    }`}
                >
                  {s.weight}
                </button>
              ))}
            </div>

            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-between px-8 shadow-xl"
            >
              <span>Add to Bag</span>
              <span className="text-sm font-heading font-black text-yellow-400">
                ₹{selectedSize.price}
              </span>
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default React.memo(ProductCard);
