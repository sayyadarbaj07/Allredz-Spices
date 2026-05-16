import React from "react";
import { motion, useInView, m } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const stats = [
  { label: "Years of Heritage", value: 35, suffix: "+" },
  { label: "Pure Spice Blends", value: 50, suffix: "+" },
  { label: "Happy Kitchens", value: 10, suffix: "K+" },
  { label: "States Covered", value: 15, suffix: "+" },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const { fadeUp, staggerContainer, viewportSettings, isMobile } = useScrollAnimation();

  return (
    <section className="py-20 md:py-32 bg-brand-red text-white relative overflow-hidden">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
      </div>
      
      <div className="section-container relative z-10">
        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 text-center"
        >
          {stats.map((stat, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className="space-y-4"
            >
              <h3 className={`text-5xl md:text-7xl lg:text-8xl font-heading font-black text-yellow-400 glow-text ${!isMobile ? 'drop-shadow-2xl' : ''}`}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>

              <div className="w-12 h-[1px] bg-white/20 mx-auto" />
              <p className="text-[10px] md:text-xs font-body font-black uppercase tracking-[0.4em] text-white/50">
                {stat.label}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-yellow-400/10 rounded-full blur-[150px] -z-10" />
    </section>
  );
};

export default StatsCounter;

