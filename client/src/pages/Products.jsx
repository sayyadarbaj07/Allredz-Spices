import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero from "../assets/masala.png";
import { useGetAllProductsQuery } from "../redux/Api/productAPi";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});
  const [toast, setToast] = useState(null); // { message: "text" }

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
    // Trigger storage event for Navbar to update
    window.dispatchEvent(new Event("storage"));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

    // ✅ Show toast alert
    setToast({ message: `${product.name} added to cart!` });
    setTimeout(() => setToast(null), 2000); // hide after 2 sec
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-xl text-red-700 font-bold">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-xl text-red-700 font-bold">
        Failed to load products ❌
      </div>
    );

  return (
    <div className="py-24 px-6 bg-[#f5e6d3] min-h-screen relative font-sans">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#8b1c1c] text-white px-8 py-4 rounded-2xl shadow-2xl z-[60] font-bold border-2 border-white/20"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-red-900 tracking-tighter uppercase mb-4">
          Exclusive <span className="text-red-600">Products</span>
        </h1>
        <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full" />
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative bg-[#fffdf0] rounded-[2.5rem] shadow-2xl hover:shadow-red-950/50 border-4 border-transparent hover:border-yellow-400/50 overflow-hidden transform hover:-translate-y-3 transition-all duration-500 flex flex-col"
          >
            {/* Image Container */}
            <div className="bg-gradient-to-br from-white to-gray-100 flex justify-center items-center py-10 px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <img
                src={product.image || hero}
                alt={product.name}
                className="w-full h-48 sm:h-56 object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 z-10"
              />
            </div>

            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2">
                {product.name}
              </h3>

              <div className="mt-6 relative flex-grow">
                <label className="text-xs font-bold uppercase tracking-widest text-red-700 block mb-2">
                  Select Size
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-gray-900 font-bold focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none cursor-pointer text-lg shadow-sm"
                    onChange={(e) =>
                      setSelectedSize({
                        ...selectedSize,
                        [product._id]: product.sizes.find(
                          (s) => s.weight === e.target.value
                        ),
                      })
                    }
                  >
                    {product.sizes.map((s) => (
                      <option key={s.weight} value={s.weight} className="font-semibold">
                        {`${s.weight} - ₹${s.price}`}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-red-600">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Price</span>
                  <span className="text-3xl font-black text-red-700">
                    ₹{selectedSize[product._id]?.price || product.sizes[0].price}
                  </span>
                </div>
                <motion.button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-full font-black uppercase tracking-wider shadow-lg hover:shadow-red-700/40 transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
