import React from "react";
import chikanmasala from "../assets/masala.png";
import { motion, m } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-brand-red text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative min-h-screen md:min-h-[100svh] px-4 sm:px-8 lg:px-16 py-32 md:py-0">
      {/* Background Cinematic Texture & Effects */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none"></div>
      
      {/* Floating Particles (CSS Only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-float-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        {/* LEFT CONTENT */}
        <m.div
          className="w-full md:w-3/5 space-y-8 text-center md:text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="space-y-4">
            <m.span 
              variants={itemVariants}
              className="cinematic-heading text-yellow-400 text-xs md:text-sm font-bold block"
            >
              Since 1985 • Authentic Tradition
            </m.span>
            
            <m.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black leading-[1.1] tracking-tight"
            >
              Experience the <br />
              <span className="italic text-yellow-400 glow-text">Soul of India</span>
            </m.h1>
          </div>

          <m.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 max-w-xl font-body leading-relaxed mx-auto md:mx-0"
          >
            Elevate your kitchen with premium, hand-picked spices crafted from 
            the finest ingredients across the Indian subcontinent.
          </m.p>

          <m.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <button className="premium-button bg-yellow-500 hover:bg-yellow-400 text-brand-red w-full sm:w-auto">
              Shop the Collection
            </button>
            <button className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-2">
              Our Legacy <span className="text-yellow-400">→</span>
            </button>
          </m.div>
        </m.div>

        {/* RIGHT CONTENT */}
        <m.div
          className="w-full md:w-2/5 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative group w-full max-w-[320px] sm:max-w-none">
            <div className="absolute -inset-10 bg-yellow-400/20 rounded-full blur-[40px] md:blur-[100px] group-hover:bg-yellow-400/30 transition duration-1000"></div>
            <m.div
              className="relative w-full aspect-[4/5] sm:w-64 md:w-80 lg:w-96 h-auto sm:h-[500px] lg:h-[600px] overflow-hidden rounded-[3rem] sm:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-4 border-white/10 gpu-accelerated"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={chikanmasala}
                alt="Premium Indian Spices"
                loading="lazy"
                decoding="async"
                width={384}
                height={600}
                className="w-full h-full object-cover scale-105 md:group-hover:scale-125 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </m.div>
          </div>
        </m.div>
      </div>

      {/* Scroll Indicator */}
      <m.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Explore</span>
        <ChevronDown size={16} />
      </m.div>
    </section>
  );
};

export default Hero;

