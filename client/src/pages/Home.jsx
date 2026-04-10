import React from "react";
import chikanmasala from "../assets/masala.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-[#8b1c1c] text-white px-8 md:px-20 py-24 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
      {/* Left Content (Text and CTA) */}
      <motion.div
        className="md:w-1/2 space-y-6 z-10 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-serif">
          Bringing Authentic <br /> Indian Flavors
        </h1>
        <p className="text-xl text-gray-200">
          Premium quality spices and masalas, crafted from the finest
          ingredients.
        </p>
        <motion.button
          className="bg-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>

      {/* Right Content (Products) */}
      <motion.div
        className="md:w-1/2 flex justify-end gap-5 md:gap-8 mt-16 md:mt-0 relative z-10 mr-[-2rem] md:mr-[-4rem]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Product 1: Garam Masala */}
        <div className="w-48 h-72 overflow-hidden shadow-2xl rounded-3xl">
          <motion.img
            src={chikanmasala}
            alt="Chicken Masala"
            className="w-full h-full object-cover object-center scale-125 "
            whileHover={{ scale: 1.35 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {/* Product 2: Chicken/Meat Masala */}
        <div className="w-48 h-72 overflow-hidden shadow-2xl rounded-lg">
          <motion.img
            src={chikanmasala}
            alt="Chicken Masala"
            className="w-full h-full object-cover object-center scale-125 "
            whileHover={{ scale: 1.35 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {/* Product 3: Biryani Masala */}
        <div className="w-48 h-72 overflow-hidden shadow-2xl rounded-lg">
          <motion.img
            src={chikanmasala}
            alt="Chicken Masala"
            className="w-full h-full object-cover object-center scale-125 "
            whileHover={{ scale: 1.35 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
