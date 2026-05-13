import React, { useState } from "react";
import { motion, m } from "framer-motion";
import spiceImg from "../assets/masala.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const AboutUs = () => {
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    { title: "Ethical Sourcing", desc: "Direct from heritage farmers across Kerala, Rajasthan, and Kashmir, bypassing middle-men to ensure peak freshness." },
    { title: "Heritage Process", desc: "Our signature slow-speed stone-grinding process prevents heat-friction, keeping the volatile oils locked inside." },
    { title: "Purity Protocol", desc: "Every single batch is lab-tested for microbial safety and 100% purity. No fillers, no colors, no compromises." }
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen font-body overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative py-32 md:py-48 px-6 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-red-100/30 rounded-full blur-[60px] md:blur-[150px] -z-10 opacity-60" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-yellow-100/20 rounded-full blur-[60px] md:blur-[120px] -z-10" />
        
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <m.div 
              className="w-full md:w-3/5 space-y-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="space-y-4">
                <m.span variants={fadeUp} className="cinematic-heading text-brand-red text-sm block">
                  Our Essence
                </m.span>
                <m.h1 variants={fadeUp} className="text-5xl sm:text-7xl md:text-8xl font-heading font-black text-gray-900 leading-[1.05] tracking-tight">
                  A Legacy of <br />
                  <span className="italic text-brand-red glow-text">True Flavors</span>
                </m.h1>
              </div>

              <m.p variants={fadeUp} className="text-xl text-gray-600 leading-relaxed max-w-xl font-body">
                Since our humble beginnings in 1985, Allredz Spices has been dedicated 
                to preserving the authentic soul of Indian cuisine. We believe that 
                every spice tells a story of the soil it was born from.
              </m.p>

              <m.div variants={fadeUp} className="flex gap-12 pt-4">
                <div className="space-y-1">
                  <h4 className="text-4xl font-heading font-black text-brand-red">35+</h4>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-black">Years of Heritage</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-4xl font-heading font-black text-brand-red">100%</h4>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-black">Organic Sourced</p>
                </div>
              </m.div>

              <m.div variants={fadeUp} className="pt-8">
                 <button className="premium-button bg-brand-red text-white">Discover the Collection</button>
              </m.div>
            </m.div>

            <m.div 
              className="w-full md:w-2/5 relative"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute -inset-10 bg-brand-gold/5 rounded-[4rem] rotate-6 scale-95" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group">
                <img 
                  src={spiceImg} 
                  alt="Authentic Spices" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover scale-110 md:group-hover:scale-125 transition-transform duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-red/20 to-transparent" />
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Dark Cinematic */}
      <section className="bg-brand-red py-32 md:py-48 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <m.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-heading font-black italic leading-tight tracking-tight"
          >
            "Spices are the <span className="text-yellow-400 underline decoration-white/20 glow-text">heartbeat</span> of the Indian kitchen."
          </m.h2>
          <m.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-white/70 text-lg md:text-2xl font-body max-w-3xl mx-auto leading-relaxed italic"
          >
            We traverse the length and breadth of India to source spices that 
            are hand-picked, stone-ground, and sun-dried to keep their 
            essential oils and aromas intact.
          </m.p>
        </div>
      </section>

      {/* Grid Features - Modern Cards */}
      <section className="py-32 md:py-48 px-6 bg-white">
        <div className="section-container">
          <m.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
          >
            {features.map((feature, i) => {
              const isActive = activeCard === i;
              return (
                <m.div 
                  key={i}
                  variants={fadeUp}
                  className="group relative cursor-pointer outline-none"
                  onMouseEnter={() => window.innerWidth >= 1024 && setActiveCard(i)}
                  onMouseLeave={() => window.innerWidth >= 1024 && setActiveCard(null)}
                  onClick={() => window.innerWidth < 1024 && setActiveCard(isActive ? null : i)}
                  tabIndex="0"
                >
                  <div 
                    className={`p-12 luxury-card relative h-full transition-all duration-700 ease-in-out touch-none
                      ${isActive ? 'bg-brand-red -translate-y-4 shadow-2xl shadow-brand-red/20' : 'bg-[#faf9f6] border-none group-hover:bg-brand-red group-hover:-translate-y-4 group-hover:shadow-2xl group-hover:shadow-brand-red/20'}
                    `}
                  >
                    <div className="relative z-10">
                      <span 
                        className={`text-6xl font-heading font-black block mb-6 transition-colors duration-500
                          ${isActive ? 'text-white/10' : 'text-brand-red/10 group-hover:text-white/10'}
                        `}
                      >
                        0{i+1}
                      </span>
                      <h3 
                        className={`text-2xl md:text-3xl font-heading font-black mb-6 transition-colors duration-500
                          ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}
                        `}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className={`text-sm md:text-base leading-relaxed font-body transition-colors duration-500
                          ${isActive ? 'text-white/70' : 'text-gray-500 group-hover:text-white/70'}
                        `}
                      >
                        {feature.desc}
                      </p>
                    </div>
                    
                    {/* Decorative Accent */}
                    <div 
                      className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-brand-red/5 to-transparent rounded-tl-full transition-opacity duration-700
                        ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}
                      `} 
                    />
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
