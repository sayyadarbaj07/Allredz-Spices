import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUp,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import logo from "../assets/logo.png";
import { motion, m, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Footer = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <footer className="bg-brand-red text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
      </div>

      <div className="section-container relative z-10">
        <m.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20 border-b border-white/10 pb-20"
        >
          {/* Brand Info */}
          <m.div variants={fadeUp} className="space-y-8 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-4 group">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-1 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-display font-black tracking-widest leading-none">ALLREDZ</span>
                <span className="text-[9px] font-body font-bold tracking-[0.4em] uppercase text-yellow-400 mt-1">Spices</span>
              </div>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Preserving the authentic heritage of Indian spices since 1985. 
              Hand-picked, stone-ground, and delivered with passion.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-brand-red hover:border-yellow-400 transition-all duration-500">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </m.div>

          {/* Quick Links */}
          <m.div variants={fadeUp} className="text-center md:text-left">
            <h4 className="text-sm font-display font-bold uppercase tracking-[0.3em] text-yellow-400 mb-8">Experience</h4>
            <ul className="space-y-4">
              {["Home", "Our Spices", "Recipes", "Our Story", "Contact"].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/60 hover:text-white transition-colors text-[10px] font-body font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-yellow-400 transition-all duration-500"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Newsletter */}
          <m.div variants={fadeUp} className="text-center md:text-left lg:col-span-2 max-w-md lg:ml-auto">
            <h4 className="text-sm font-display font-bold uppercase tracking-[0.3em] text-yellow-400 mb-8">Newsletter</h4>
            <p className="text-sm text-white/60 font-body leading-relaxed mb-8 italic">
              Join our inner circle for exclusive recipes, spice lore, and seasonal releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  required
                  className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-2xl focus:outline-none focus:border-yellow-400/50 text-[10px] uppercase tracking-widest transition-all group-hover:bg-white/10"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-yellow-400 text-brand-red px-6 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Join
                </button>
              </div>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck size={12} /> Secure & Private. Unsubscribe anytime.
              </p>
            </form>
          </m.div>
        </m.div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <p className="text-[10px] text-white/30 font-body font-black uppercase tracking-widest">
              © {currentYear} Allredz Spices. Premium Tradition.
            </p>
            <div className="flex gap-8 text-[10px] text-white/30 font-black uppercase tracking-widest">
              <Link to="#" className="hover:text-yellow-400 transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-yellow-400 transition-colors">Terms</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <span className="text-[9px] font-black uppercase tracking-widest mr-2">Secure Payments</span>
               <div className="px-2 py-0.5 border border-white/20 rounded text-[8px] font-bold">VISA</div>
               <div className="px-2 py-0.5 border border-white/20 rounded text-[8px] font-bold">MASTER</div>
               <div className="px-2 py-0.5 border border-white/20 rounded text-[8px] font-bold">UPI</div>
            </div>

            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all"
            >
              <span className="hidden sm:inline">Back to top</span> 
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-brand-red group-hover:border-yellow-400 transition-all duration-500">
                <ArrowUp size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <m.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-12 rounded-[3.5rem] max-w-sm text-center space-y-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red to-yellow-400" />
              <div className="w-24 h-24 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                 <Mail size={40} />
              </div>
              <div className="space-y-4">
                <h4 className="text-4xl font-heading font-black text-gray-900 leading-tight">Welcome to the Inner Circle</h4>
                <p className="text-gray-500 font-body text-sm leading-relaxed">
                  Your journey into the world of authentic spices has begun. 
                  Expect a special surprise in your inbox soon.
                </p>
              </div>
              <button 
                 onClick={() => setShowConfirmation(false)}
                 className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-colors shadow-lg"
              >
                 Close Gateway
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
      
      {/* Background Decorative Glow */}
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-black/60 rounded-full blur-[150px] -z-10" />
    </footer>
  );
};

export default Footer;
