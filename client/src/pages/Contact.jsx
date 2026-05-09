import React, { useState } from "react";
import { motion, m, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, ArrowRight, Send } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("Thank you for your message! Our spice experts will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitStatus(""), 5000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-24 px-6 font-body overflow-hidden relative">
      {/* Cinematic Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/20 rounded-full blur-[150px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-[120px] -z-10" />

      <div className="section-container">
        {/* Header Section */}
          <m.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-24 space-y-8"
          >
          <div className="space-y-4">
            <m.span variants={fadeUp} className="cinematic-heading text-red-800 text-sm block">Connect With Us</m.span>
            <m.h1 variants={fadeUp} className="text-5xl sm:text-7xl md:text-8xl font-heading font-black text-gray-900 leading-[1.05] tracking-tight">
              Let's Start a <br />
              <span className="italic text-brand-red glow-text">Conversation</span>
            </m.h1>
          </div>
          <m.p variants={fadeUp} className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed font-body italic">
            Whether you're a home cook, a professional chef, or looking for bulk supply, 
            our dedicated team is here to assist you with every aromatic detail.
          </m.p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Form Section */}
          <m.div 
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="luxury-card p-12 md:p-16 bg-white relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h3 className="text-3xl font-heading font-black text-gray-900 mb-12 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red">
                 <MessageSquare size={28} />
              </div>
              Inquire Now
            </h3>
            
            <AnimatePresence>
              {submitStatus && (
                <m.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-12 p-8 bg-emerald-50 text-emerald-700 rounded-3xl text-sm font-black border border-emerald-100 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                     <ArrowRight size={20} />
                  </div>
                  {submitStatus}
                </m.div>
              )}
            </AnimatePresence>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-brand-red/20 transition-all outline-none font-bold placeholder:text-gray-300"
                    placeholder="E.g. Arjun Kapoor"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-brand-red/20 transition-all outline-none font-bold placeholder:text-gray-300"
                    placeholder="arjun@premium.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Your Inquiry</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-3xl p-6 text-sm focus:ring-2 focus:ring-brand-red/20 transition-all outline-none font-bold resize-none placeholder:text-gray-300"
                  placeholder="Tell us about your spice journey..."
                ></textarea>
              </div>

              <button className="premium-button w-full bg-brand-red text-white py-6 shadow-2xl hover:bg-gray-900 group">
                Send Message <Send size={16} className="ml-3 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </m.div>

          {/* Info Section */}
          <m.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-16"
          >
            <div className="space-y-12">
              <m.h3 variants={fadeUp} className="text-3xl font-heading font-black text-gray-900 border-l-8 border-brand-red pl-8 italic">Contact Information</m.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: Phone, label: "Hotline", value: "+91 7755988986", color: "text-blue-500" },
                  { icon: Mail, label: "Inquiries", value: "support@allredz.com", color: "text-brand-red" },
                  { icon: Globe, label: "Digital Home", value: "allredz.com", color: "text-emerald-500" },
                  { icon: Clock, label: "Availability", value: "Mon-Sat: 9AM - 8PM", color: "text-amber-500" }
                ].map((item, i) => (
                  <m.div key={i} variants={fadeUp} className="flex gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <item.icon size={22} className={item.color} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                      <p className="text-gray-900 font-bold text-lg">{item.value}</p>
                    </div>
                  </m.div>
                ))}
              </div>

              <m.div variants={fadeUp} className="flex gap-6 pt-8 border-t border-gray-100 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <MapPin size={22} className="text-red-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Headquarters</p>
                  <p className="text-gray-700 font-bold text-lg leading-relaxed">
                    Allredz Masale, Main Road, Gate No-01 A/P: Chaklamba, <br />
                    Tal. Georai, Dist. Beed, 431130, Maharashtra, India
                  </p>
                </div>
              </m.div>
            </div>

            <m.div 
              variants={fadeUp}
              className="p-12 bg-white rounded-[3rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-heading font-black text-brand-gold uppercase tracking-widest flex items-center gap-3">
                   <div className="w-10 h-[2px] bg-brand-gold" /> Bulk Orders
                </h4>
                <p className="text-gray-600 text-base leading-relaxed font-body italic">
                  We partner with premium restaurants, luxury hotels, and distributors 
                  globally. For wholesale pricing, custom blends, or international exports, 
                  please mention "BULK" in your message.
                </p>
                <button className="text-brand-red text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 group/btn">
                  Download Institutional Catalog <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />
            </m.div>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
