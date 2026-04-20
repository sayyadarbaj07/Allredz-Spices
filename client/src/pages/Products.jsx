import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero from "../assets/masala.png";
import { useGetAllProductsQuery } from "../redux/Api/productAPi";
import { useNavigate } from "react-router-dom";

const Products = () => {
  // Logic remains identical to your original file
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

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
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

    setToast({ message: `${product.name} added to cart!` });
    setTimeout(() => setToast(null), 2000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#f5e6d3]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-700"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 px-6 min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-900 mb-2">Connection Issues</h2>
        <p className="text-gray-600 mb-6">We couldn't connect to the spice cellar. Please check your connection.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-700 text-white px-8 py-3 rounded-full font-bold hover:bg-red-800 transition shadow-lg"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="py-24 px-6 bg-[#faf9f6] min-h-screen relative font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-100/20 rounded-full blur-3xl -z-10" />

      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-8 left-1/2 bg-[#2d0a0a] text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] font-bold border border-white/10 flex items-center gap-3"
          >
            <span className="text-xl">✨</span> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-700 font-extrabold uppercase tracking-[0.2em] text-sm mb-4 block">Our Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight">
            Premium <span className="italic text-red-800">Spices</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            Elevate your culinary creations with our hand-picked, authentic spices 
            sourced directly from the most fertile regions of India.
          </p>
        </motion.div>
      </div>

      {/* Products Grid - MAXIMIZED DENSITY */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 max-w-[95rem] mx-auto px-2 md:px-0">
        {products.map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex flex-col"
          >
            {/* Card Main Container - HIGH DENSITY */}
            <div className="bg-white rounded-[1.2rem] p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-[0_12px_24px_rgba(139,28,28,0.06)] transition-all duration-500 flex flex-col flex-grow border border-gray-100 overflow-hidden">
              
              {/* Image Area - COMPACT */}
              <div className="relative h-40 rounded-[0.8rem] bg-[#fcfcfc] overflow-hidden flex items-center justify-center p-4 transition-colors duration-500 group-hover:bg-[#fffdfd]">
                {/* Decorative Shape */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-50/50 to-transparent opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full shadow-inner group-hover:scale-110 transition-transform duration-700" />
                
                <img
                  src={
                    product.image?.startsWith("/uploads/")
                      ? `${import.meta.env.VITE_API_URL || ""}${product.image}`
                      : product.image || hero
                  }
                  alt={product.name}
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                  <span className="bg-white text-red-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border border-gray-100">
                    {product.category || "Organic"}
                  </span>
                </div>
              </div>

              {/* Content Area - ULTRA COMPACT */}
              <div className="pt-4 pb-1 px-1 flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-base font-serif text-gray-900 group-hover:text-red-900 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="w-6 h-0.5 bg-red-800/20 mt-0.5 group-hover:w-12 transition-all duration-500" />
                </div>

                <p className="text-[11px] text-gray-400 leading-tight line-clamp-2 mb-3 h-7">
                  {product.description || "Premium authentic spice blend."}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-300">Weight</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.05em] text-green-600 px-1.5 py-0.5 bg-green-50 rounded">In Stock</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s.weight}
                        onClick={() =>
                          setSelectedSize({
                            ...selectedSize,
                            [product._id]: s,
                          })
                        }
                        className={`py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all border ${
                          (selectedSize[product._id]?.weight || product.sizes[0].weight) === s.weight
                            ? "border-red-800 bg-red-800 text-white shadow-sm"
                            : "border-gray-100 bg-gray-50 text-gray-400 hover:border-red-100"
                        }`}
                      >
                        {s.weight}
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 mt-1 border-t border-gray-50">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#111] hover:bg-black text-white py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-between px-3"
                    >
                      <span>Add to Cart</span>
                      <span className="text-xs italic bg-white/10 px-2 py-0.5 rounded ml-2">
                        ₹{selectedSize[product._id]?.price || product.sizes[0].price}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;