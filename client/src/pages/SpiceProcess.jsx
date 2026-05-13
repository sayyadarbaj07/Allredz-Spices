import React, { useState } from "react";
import { motion, m, AnimatePresence } from "framer-motion";
import { Leaf, Flame, ShieldCheck, Truck } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const processes = [
  {
    icon: Leaf,
    title: "Hand-Picked Sourcing",
    desc: "We select only the finest, sun-ripened spices directly from ethical heritage farms across the Indian subcontinent.",
  },
  {
    icon: Flame,
    title: "Traditional Stone Grinding",
    desc: "Our spices are ground slowly using traditional methods to preserve essential oils and intense natural aromas.",
  },
  {
    icon: ShieldCheck,
    title: "Lab-Tested Purity",
    desc: "Every batch undergoes rigorous quality testing to ensure zero adulteration and 100% organic integrity.",
  },
  {
    icon: Truck,
    title: "Freshness Lock Delivery",
    desc: "Advanced vacuum-seal technology ensures that the spices arrive at your doorstep as fresh as the day they were ground.",
  },
];

const SpiceProcess = () => {
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();
  const [activeCard, setActiveCard] = useState(null);

  const handleInteraction = (index) => {
    // Toggle active state on mobile tap
    if (window.innerWidth < 1024) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#faf9f6] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-red/5 rounded-full blur-[100px] -z-10" />

      <div className="section-container">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-20 md:mb-24 space-y-6 px-4"
        >
          <m.span variants={fadeUp} className="cinematic-heading text-brand-red text-xs sm:text-sm">The Allredz Standard</m.span>
          <m.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-gray-900 tracking-tight leading-tight">
            From Soil to <span className="italic text-brand-red glow-text">Soul</span>
          </m.h2>
          <m.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-500 font-body text-base px-4">
            Discover the meticulous process that transforms nature's finest gifts into
            the premium spices that define your culinary masterpieces.
          </m.p>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processes.map((p, i) => {
            const isActive = activeCard === i;
            
            return (
              <m.div
                key={i}
                variants={fadeUp}
                className="group relative cursor-pointer outline-none"
                onMouseEnter={() => window.innerWidth >= 1024 && setActiveCard(i)}
                onMouseLeave={() => window.innerWidth >= 1024 && setActiveCard(null)}
                onClick={() => handleInteraction(i)}
                tabIndex="0"
              >
                <div 
                  className={`p-10 luxury-card h-full space-y-8 transition-all duration-700 ease-in-out touch-none relative z-10 border-none
                    ${isActive 
                      ? '!bg-brand-red -translate-y-4 shadow-[0_30px_70px_-15px_rgba(139,28,28,0.4)]' 
                      : 'bg-white group-hover:!bg-brand-red group-hover:-translate-y-4 group-hover:shadow-[0_30px_70px_-15px_rgba(139,28,28,0.4)]'}
                  `}
                >
                  <div className="relative">
                    <span 
                      className={`absolute -top-6 -left-6 text-6xl font-heading font-black transition-colors duration-700
                        ${isActive ? 'text-white/10' : 'text-gray-100 group-hover:text-white/10'}
                      `}
                    >
                      0{i + 1}
                    </span>
                    <div 
                      className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500
                        ${isActive ? 'bg-white rotate-[12deg]' : 'bg-brand-red/5 group-hover:bg-white group-hover:rotate-[12deg]'}
                      `}
                    >
                      <p.icon 
                        size={36} 
                        className={`transition-all duration-500
                          ${isActive ? 'text-brand-red scale-110' : 'text-brand-red group-hover:text-brand-red group-hover:scale-110'}
                        `} 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 
                      className={`text-2xl font-heading font-black transition-colors duration-500
                        ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}
                      `}
                    >
                      {p.title}
                    </h3>
                    <p 
                      className={`text-sm font-body leading-relaxed transition-colors duration-500
                        ${isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'}
                      `}
                    >
                      {p.desc}
                    </p>
                  </div>

                  {/* Corner Decoration */}
                  <div 
                    className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-brand-red/5 to-transparent rounded-tl-full transition-opacity duration-700
                      ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}
                    `} 
                  />
                  
                  {/* Active Indicator for Mobile */}
                  {isActive && (
                    <m.div 
                      layoutId="active-indicator"
                      className="absolute top-4 right-4 w-2 h-2 rounded-full bg-yellow-400 animate-pulse"
                    />
                  )}
                </div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
};

export default SpiceProcess;
