import React from "react";
import { motion, m } from "framer-motion";
import masala from "../assets/masala.png";
import chikanmasala from "../assets/chikanmasala.png";
import spice5 from "../assets/spice5.jpg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Clock, BarChart } from "lucide-react";

const recipes = [
  {
    title: "Authentic Butter Chicken",
    time: "45 Mins",
    difficulty: "Medium",
    image: chikanmasala,
  },
  {
    title: "Slow-Cooked Mutton Rogan Josh",
    time: "2 Hours",
    difficulty: "Advanced",
    image: masala,
  },
  {
    title: "Fragrant Vegetable Biryani",
    time: "60 Mins",
    difficulty: "Easy",
    image: spice5,
  },
];

const Recipes = () => {
  const { fadeUp, staggerContainer, viewportSettings, clipPathReveal } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="section-container">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8"
        >
          <div className="space-y-6 text-center md:text-left w-full md:w-auto">
            <m.span variants={fadeUp} className="cinematic-heading text-red-800 text-sm">Culinary Arts</m.span>
            <m.h2 variants={fadeUp} className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-gray-900 leading-[1.1] tracking-tight">
              Spice up your <br />
              <span className="italic text-brand-red glow-text">Masterpieces</span>
            </m.h2>
          </div>
          <m.p variants={fadeUp} className="max-w-md text-gray-500 font-body text-lg leading-relaxed text-center md:text-left mx-auto md:mx-0">
            Discover the secrets of traditional Indian cooking with our curated 
            recipes designed to highlight the potency and aroma of Allredz Spices.
          </m.p>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {recipes.map((recipe, i) => (
            <m.div
              key={i}
              variants={clipPathReveal}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4.5] md:aspect-[3/4] rounded-[3.5rem] overflow-hidden mb-8 shadow-2xl transition-all duration-700 group-hover:shadow-brand-red/20 gpu-accelerated">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                
                <div className="absolute bottom-10 left-10 right-10 space-y-4 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-[9px] font-body font-black uppercase tracking-widest border border-white/20">
                      <Clock size={12} className="text-yellow-400" /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/20 backdrop-blur-md text-yellow-400 text-[9px] font-body font-black uppercase tracking-widest border border-yellow-400/20">
                      <BarChart size={12} /> {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="text-3xl font-heading font-black text-white leading-tight">
                    {recipe.title}
                  </h3>
                </div>

                <div className="absolute top-10 right-10 w-14 h-14 bg-white rounded-full flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 shadow-xl">
                  <span className="text-brand-red text-2xl font-bold">→</span>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>

        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          className="mt-20 text-center"
        >
          <button className="premium-button border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
            View All Recipes
          </button>
        </m.div>
      </div>
    </section>
  );
};

export default Recipes;

