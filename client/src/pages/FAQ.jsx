import React, { useState } from "react";
import { motion, AnimatePresence, m } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const faqs = [
  {
    question: "What makes Allredz Spices 'premium'?",
    answer: "Our spices are sourced from heritage farms, stone-ground at low temperatures to preserve essential oils, and subjected to rigorous lab testing for 100% purity with zero adulteration.",
  },
  {
    question: "Do you use any artificial colors or preservatives?",
    answer: "Absolutely not. The vibrant colors of our masalas come solely from high-quality natural ingredients like Byadgi chillies and Salem turmeric.",
  },
  {
    question: "How should I store the spices to maintain freshness?",
    answer: "Keep them in a cool, dry, and dark place. While our packaging is designed to lock in freshness, transferring them to an airtight glass container away from sunlight will extend their aromatic life.",
  },
  {
    question: "Do you offer bulk supplies for restaurants?",
    answer: "Yes, we have a dedicated institutional sales division for restaurants and hotels. Please contact our bulk inquiry desk for custom blends and wholesale pricing.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32 bg-[#faf9f6] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] -z-10" />
      
      <div className="section-container max-w-4xl">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="text-center mb-20 space-y-6"
        >
          <m.span variants={fadeUp} className="cinematic-heading text-red-800 text-sm">Clear Inquiries</m.span>
          <m.h2 variants={fadeUp} className="text-4xl md:text-8xl font-heading font-black text-gray-900 tracking-tight leading-tight">
            Common <span className="italic text-brand-red glow-text">Curiosities</span>
          </m.h2>
        </m.div>

        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="space-y-6"
        >
          {faqs.map((faq, i) => (
            <m.div 
              key={i}
              variants={fadeUp}
              className={`luxury-card bg-white border-none transition-all duration-700 ${activeIndex === i ? "shadow-[0_30px_60px_rgba(139,28,28,0.1)]" : "shadow-[0_10px_30px_rgba(0,0,0,0.02)]"}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-8 md:p-10 flex items-center justify-between text-left group gap-6"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-sm font-heading font-black transition-colors duration-500 ${activeIndex === i ? "text-brand-red" : "text-gray-400 group-hover:text-brand-red"}`}>
                    0{i + 1}
                  </span>
                  <span className={`text-xl md:text-2xl font-heading font-bold transition-colors duration-500 ${activeIndex === i ? "text-brand-red" : "text-gray-900 group-hover:text-brand-red"}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${activeIndex === i ? "bg-brand-red text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-brand-red/10 group-hover:text-brand-red"}`}>
                  {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-10 pb-10 pt-4 text-gray-500 font-body text-base md:text-lg leading-relaxed max-w-3xl ml-16">
                      <div className="h-[1px] w-12 bg-brand-red/10 mb-8" />
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </m.div>

        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          className="mt-20 text-center space-y-6"
        >
          <p className="text-gray-400 font-body text-sm">Still have questions?</p>
          <button className="premium-button border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
            Connect with an Expert
          </button>
        </m.div>
      </div>
    </section>
  );
};

export default FAQ;

