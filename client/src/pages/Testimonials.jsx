import React from "react";
import { motion, m } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Culinary Blogger",
    text: "The aroma that hits you when you open an Allredz packet is unlike anything else. You can truly tell these are stone-ground spices. My biryanis have never tasted more authentic.",
    rating: 5,
  },
  {
    name: "Chef Rahul Verma",
    role: "Executive Chef",
    text: "In a professional kitchen, consistency is everything. Allredz provides the same intense potency and purity in every batch. They are my secret ingredient for perfection.",
    rating: 5,
  },
  {
    name: "Meera Deshmukh",
    role: "Traditional Home Cook",
    text: "I was looking for masalas that taste like my grandmother's handmade spices. Allredz is the only brand that has successfully captured that homemade soul.",
    rating: 5,
  },
];

const Testimonials = () => {
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32 bg-[#faf9f6] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/10 rounded-full blur-[120px] -z-10" />
      
      <div className="section-container">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="text-center mb-20 md:mb-24 space-y-6"
        >
          <m.span variants={fadeUp} className="cinematic-heading text-red-800 text-sm">Community Voices</m.span>
          <m.h2 variants={fadeUp} className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-gray-900 leading-[1.1] tracking-tight">
            Loved by <span className="italic text-brand-red glow-text">Connoisseurs</span>
          </m.h2>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {testimonials.map((t, i) => (
            <m.div
              key={i}
              variants={scaleIn}
              className="group relative"
            >
              <div className="p-12 luxury-card h-full flex flex-col justify-between bg-white border-none shadow-[0_20px_60px_rgba(0,0,0,0.03)] group-hover:-translate-y-4 transition-all duration-700 ease-out">
                <Quote size={40} className="text-brand-red/10 mb-8 transform -scale-x-100" />
                
                <div className="space-y-6 flex-grow">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      </m.div>
                    ))}
                  </div>
                  <p className="text-gray-600 font-body text-lg leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-red/5 flex items-center justify-center font-heading font-black text-brand-red text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-black text-gray-900">{t.name}</h4>
                    <p className="text-[10px] font-body font-black uppercase tracking-[0.3em] text-brand-red mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-red/5 to-transparent rounded-tr-[3.5rem] pointer-events-none" />
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Testimonials;

