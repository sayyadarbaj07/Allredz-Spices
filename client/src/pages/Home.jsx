import React from "react";
import chikanmasala from "../assets/masala.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-[#8b1c1c] text-white px-6 sm:px-10 md:px-20 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
      {/* LEFT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 space-y-5 z-10 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight font-serif">
          Bringing Authentic <br /> Indian Flavors
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200">
          Premium quality spices and masalas, crafted from the finest
          ingredients.
        </p>

        <motion.button
          className="bg-green-600 px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-green-700 transition shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center md:justify-end gap-4 sm:gap-6 mt-12 md:mt-0 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className="w-24 sm:w-32 md:w-40 lg:w-48 h-40 sm:h-52 md:h-64 lg:h-72 overflow-hidden shadow-2xl rounded-2xl"
          >
            <motion.img
              src={chikanmasala}
              alt="Masala"
              className="w-full h-full object-cover scale-110"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
