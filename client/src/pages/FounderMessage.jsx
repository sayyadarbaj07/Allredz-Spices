import React from "react";
import { motion, m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const FounderMessage = () => {
  const containerRef = useRef(null);
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="bg-brand-red text-white py-24 md:py-32 overflow-hidden relative min-h-[700px] flex items-center"
    >
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
      </div>

      <div className="section-container relative z-10">
        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center gap-16 lg:gap-32"
        >
          {/* Image Container */}
          <m.div 
            className="w-full md:w-1/2"
            variants={fadeUp}
          >
            <div className="relative group">
              <div className="absolute -inset-6 bg-white/5 rounded-[4rem] rotate-3 transition-transform duration-700 group-hover:rotate-6" />
              <div className="relative rounded-[3.5rem] overflow-hidden border-8 border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] aspect-square bg-brand-red/20">
                <m.img 
                  style={{ y: imageY }}
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                  alt="Founder" 
                  className="w-full h-[120%] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 to-transparent" />
              </div>

              {/* Float Label */}
              <m.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 md:-right-12 bg-yellow-400 text-brand-red p-8 rounded-3xl shadow-2xl z-20"
              >
                <p className="text-4xl font-heading font-black leading-none">35+</p>
                <p className="text-[9px] font-body font-black uppercase tracking-widest mt-1">Years of Craft</p>
              </m.div>
            </div>
          </m.div>

          {/* Text Content */}
          <m.div 
            className="w-full md:w-1/2 space-y-10 text-center md:text-left"
            variants={staggerContainer}
          >
            <m.div variants={fadeUp} className="space-y-4">
              <span className="cinematic-heading text-yellow-400 text-sm">Founder's Vision</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black italic leading-[1.1]">
                "We don't just mix spices; we engineer <span className="text-yellow-400 underline decoration-white/20 glow-text">excellence</span>."
              </h2>
            </m.div>

            <m.div variants={fadeUp} className="space-y-6 font-body text-white/70 text-lg md:text-xl leading-relaxed italic max-w-xl mx-auto md:mx-0">
              <p>
                "Coming from a background in Chemical Engineering, I've always seen 
                the kitchen as a laboratory of flavors."
              </p>
              <p>
                "Every gram of our masala is a testament to our commitment to purity, 
                potency, and the authentic Maharashtrian heritage."
              </p>
            </m.div>

            <m.div variants={fadeUp} className="pt-6 border-t border-white/10">
              <h4 className="text-2xl font-heading font-black text-white tracking-tight">Samad Sayyad</h4>
              <p className="text-[10px] font-body font-black uppercase tracking-[0.4em] text-yellow-400 mt-2">Founder & Master Blender</p>
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default FounderMessage;

