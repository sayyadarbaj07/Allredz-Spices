import React, { useState } from "react";
import { motion, m, AnimatePresence } from "framer-motion";
import spice1 from "../assets/spice1.jpg";
import spice2 from "../assets/spice2.jpg";
import spice3 from "../assets/spice3.jpg";
import spice4 from "../assets/spice4.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ingredients = [
  { 
    name: "Byadgi Chilli", 
    origin: "Karnataka", 
    benefit: "Vibrant Color & Mild Heat", 
    image: spice1,
    color: "from-red-600/20"
  },
  { 
    name: "Salem Turmeric", 
    origin: "Tamil Nadu", 
    benefit: "High Curcumin Content", 
    image: spice2,
    color: "from-yellow-600/20"
  },
  { 
    name: "Cochin Ginger", 
    origin: "Kerala", 
    benefit: "Zesty Aroma & Sharp Flavor", 
    image: spice3,
    color: "from-orange-600/20"
  },
  { 
    name: "Guntur Teja", 
    origin: "Andhra Pradesh", 
    benefit: "Intense Pungency & Rich Red", 
    image: spice4,
    color: "from-red-900/20"
  },
];

const IngredientsShowcase = () => {
  const { fadeUp, staggerContainer, viewportSettings, clipPathReveal, isMobile } = useScrollAnimation();
  const [activeCard, setActiveCard] = useState(null);

  const handleInteraction = (index) => {
    if (window.innerWidth < 1024) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="section-container relative z-10">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-16 md:mb-24 space-y-6"
        >
          <m.span variants={fadeUp} className="cinematic-heading text-brand-red text-xs sm:text-sm">The Raw Truth</m.span>
          <m.h2 variants={fadeUp} className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-gray-900 tracking-tight leading-tight px-4">
            Purity in every <span className="italic text-brand-red glow-text">Ingredient</span>
          </m.h2>
          <m.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-500 font-body text-base px-6">
            We traverse the length and breadth of India to source spices that 
            are hand-picked, stone-ground, and sun-dried.
          </m.p>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {ingredients.map((ing, i) => {
            const isActive = activeCard === i;
            return (
              <m.div
                key={i}
                variants={isMobile ? fadeUp : clipPathReveal}
                className="relative group aspect-[4/5] sm:aspect-[3/4.5] lg:aspect-[3/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-gray-100 gpu-accelerated cursor-pointer"
                onMouseEnter={() => !isMobile && setActiveCard(i)}
                onMouseLeave={() => !isMobile && setActiveCard(null)}
                onClick={() => handleInteraction(i)}
              >
                {/* Image with Parallax Effect (Disabled on mobile) */}
                <m.img 
                  src={ing.image} 
                  alt={ing.name} 
                  className={`w-full h-full object-cover transition-transform duration-[2s] ease-out 
                    ${isActive ? (isMobile ? 'scale-110' : 'scale-125') : 'group-hover:scale-125'}
                  `}
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Gradient Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700
                  ${isActive ? 'opacity-90' : 'opacity-70 group-hover:opacity-90'}
                `} />
                {!isMobile && (
                  <div className={`absolute inset-0 bg-gradient-to-tr ${ing.color} to-transparent transition-opacity duration-1000
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `} />
                )}
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  {!isMobile && (
                    <m.div 
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: { 
                          scaleX: 1,
                          transition: { delay: 0.5 + i * 0.1, duration: 1 }
                        }
                      }}
                      className="h-[1px] w-12 bg-yellow-400 origin-left mb-6" 
                    />
                  )}
                  
                  <div 
                    className={`space-y-4 transition-transform duration-500
                      ${isActive ? '-translate-y-2' : 'group-hover:-translate-y-2'}
                    `}
                  >
                    <div className="space-y-1">
                      <p className="text-yellow-400 text-[9px] font-body font-black uppercase tracking-[0.4em]">
                        Origin: {ing.origin}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight">
                        {ing.name}
                      </h3>
                    </div>
                    
                    <div className="overflow-hidden">
                      <p 
                        className={`text-white/60 text-xs md:text-sm font-body font-medium leading-relaxed transition-transform duration-300
                          ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}
                        `}
                      >
                        {ing.benefit}
                      </p>
                    </div>

                    <div 
                      className={`text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 pt-2 transition-colors
                        ${isActive ? 'text-yellow-400' : 'text-white/40 group-hover:text-yellow-400'}
                      `}
                    >
                      Details <span className="text-yellow-400">→</span>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Active Pulse */}
                {isActive && isMobile && (
                  <div className="absolute top-8 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </m.div>
            );
          })}
        </m.div>

      </div>
    </section>
  );
};

export default IngredientsShowcase;
