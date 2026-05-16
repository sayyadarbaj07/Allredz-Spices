import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, m } from "framer-motion";
import hero from "../assets/masala.png";
import { useGetAllProductsQuery } from "../redux/Api/productApi";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import ProductCard from "../components/common/ProductCard";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const { fadeUp, staggerContainer, viewportSettings, scaleIn, isMobile } = useScrollAnimation();

  const products = useMemo(() => {
    return Array.isArray(data) ? data : data?.result || [];
  }, [data]);

  const handleAddToCart = useCallback((product, size) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
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
  }, [navigate]);

  const isHomePath = window.location.pathname === "/";
  const displayedProducts = useMemo(() => {
    return isHomePath ? products.slice(0, 8) : products;
  }, [products, isHomePath]);


  if (isLoading)
    return (
      <div className="py-24 px-6 bg-[#faf9f6] min-h-screen">
        <div className="section-container">
          <div className="h-20 w-3/4 mx-auto shimmer-loading rounded-2xl mb-12" />
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {[...Array(isHomePath ? 4 : 8)].map((_, i) => (
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
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100/20 rounded-full blur-[120px] -z-10" />
        </>
      )}

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
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
          className="grid gap-4 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {displayedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              hero={hero}
              onAddToCart={handleAddToCart}
              variants={scaleIn}
            />
          ))}
        </m.div>

        {isHomePath && products.length > 8 && (
          <m.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button 
              onClick={() => navigate("/products")}
              className="premium-button bg-gray-900 text-white hover:bg-black inline-flex"
            >
              View Full Collection ({products.length} Spices)
            </button>
          </m.div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Products);