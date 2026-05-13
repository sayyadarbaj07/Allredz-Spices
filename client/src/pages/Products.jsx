import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, m } from "framer-motion";
import hero from "../assets/masala.png";
import { useGetAllProductsQuery } from "../redux/Api/productApi";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { ShoppingCart, Eye, Star } from "lucide-react";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState({});
  const [toast, setToast] = useState(null);
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();

  const products = Array.isArray(data) ? data : data?.result || [];

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const size = selectedSize[product._id] || product.sizes[0];

    const existing = cart.find(
      (p) => p._id === product._id && p.selectedWeight === size.weight
    );

    if (existing) existing.quantity += 1;
    else
      cart.push({
        ...product,
        quantity: 1,
        selectedWeight: size.weight,
        selectedPrice: size.price,
        image: product.image || hero,
      });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    setToast({ message: `${product.name} added to cart!` });
    setTimeout(() => setToast(null), 2000);
  };

  if (isLoading)
    return (
      <div className="py-24 px-6 bg-[#faf9f6] min-h-screen">
        <div className="section-container">
          <div className="h-20 w-3/4 mx-auto shimmer-loading rounded-2xl mb-12" />
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] shimmer-loading rounded-[2.5rem]" />
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 px-6 min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center">
        <div className="text-6xl mb-6 animate-bounce">🌶️</div>
        <h2 className="text-3xl font-heading font-black text-brand-red mb-4">The Spice Cellar is Locked</h2>
        <p className="text-gray-500 mb-8 max-w-md">Our secret vault of authentic spices is currently under maintenance. Please check back shortly.</p>
        <button
          onClick={() => window.location.reload()}
          className="premium-button bg-brand-red text-white"
        >
          Re-authenticate Connection
        </button>
      </div>
    );

  return (
    <div className="py-24 md:py-32 bg-[#faf9f6] min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100/20 rounded-full blur-[120px] -z-10" />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl z-[100] font-bold border border-white/10 flex items-center gap-3 backdrop-blur-md"
          >
            <span className="text-yellow-400">✨</span> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-container">
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mb-20 text-center space-y-6"
        >
          <m.span variants={fadeUp} className="cinematic-heading text-red-800 text-sm">Our Collection</m.span>
          <m.h2 
            variants={fadeUp}
            className="text-4xl sm:text-6xl md:text-8xl font-heading font-black leading-[1.1] tracking-tight text-gray-900"
          >
            The <span className="italic text-brand-red">Spice Vault</span>
          </m.h2>
          <m.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed font-body">
            Each blend is a masterpiece of tradition, stone-ground to preserve the 
            intense aromas and essential oils that define authentic Indian cuisine.
          </m.p>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product, idx) => (
            <m.div
              key={product._id}
              variants={scaleIn}
              className="group relative flex flex-col w-full max-w-sm mx-auto md:max-w-none"
            >
              <div className="luxury-card h-full flex flex-col bg-white border-none shadow-[0_15px_40px_rgba(0,0,0,0.04)] group-hover:shadow-[0_30px_70px_rgba(139,28,28,0.12)] transition-all duration-700">
                {/* Image Area */}
                <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-gray-50/50 flex items-center justify-center p-6 md:p-8">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <m.img
                    src={
                      product.image?.startsWith("/uploads/")
                        ? `${import.meta.env.VITE_API_URL || ""}${product.image}`
                        : product.image || hero
                    }
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={375}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-20">
                    <button className="w-12 h-12 rounded-full bg-white text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)}
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
                          onClick={() =>
                            setSelectedSize({
                              ...selectedSize,
                              [product._id]: s,
                            })
                          }
                          className={`py-2 px-4 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-500 border-2 ${(selectedSize[product._id]?.weight || product.sizes[0].weight) === s.weight
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
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-between px-8 shadow-xl"
                    >
                      <span>Add to Bag</span>
                      <span className="text-sm font-heading font-black text-yellow-400">
                        ₹{selectedSize[product._id]?.price || product.sizes[0].price}
                      </span>
                    </m.button>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </div>
  );
};

export default Products;