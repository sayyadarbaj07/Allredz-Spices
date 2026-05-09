import React from "react";
import { m } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Lock,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Settings() {
  const { fadeUp, staggerContainer } = useScrollAnimation();

  const settingsGroups = [
    {
      title: "Core Configuration",
      items: [
        { label: "Notification Channels", icon: Bell, status: "Active", desc: "System-wide alert dispatching" },
        { label: "Security Protocol", icon: Shield, status: "Enterprise", desc: "Encryption & access control" },
      ]
    },
    {
      title: "Interface & Style",
      items: [
        { label: "Visual Identity", icon: Palette, status: "Premium", desc: "Cinematic theme settings" },
        { label: "Global Localization", icon: Globe, status: "Multi-Region", desc: "Currency & language nodes" },
      ]
    },
    {
      title: "Data Vault",
      items: [
        { label: "Storage Manifest", icon: Database, status: "92% Capacity", desc: "Database health & backups" },
        { label: "Authentication Keys", icon: Lock, status: "Rotated", desc: "API & JWT token management" },
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <m.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">System Nodes</span>
        <h1 className="text-4xl font-heading font-black text-gray-900 tracking-tight">
           Master <span className="italic text-brand-red glow-text">Settings</span>
        </h1>
      </m.div>

      <m.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-3 gap-8"
      >
        {settingsGroups.map((group, idx) => (
          <m.div key={idx} variants={fadeUp} className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-4">{group.title}</h3>
            <div className="space-y-4">
              {group.items.map((item, i) => (
                <button key={i} className="luxury-card bg-white p-8 w-full text-left group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                   <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-[#faf9f6] rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-red group-hover:text-white transition-all">
                            <item.icon size={20} />
                         </div>
                         <div className="space-y-1">
                            <h4 className="font-heading font-black text-gray-900 tracking-tight">{item.label}</h4>
                            <p className="text-[10px] text-gray-400 font-medium italic">{item.desc}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{item.status}</span>
                         <ArrowRight size={14} className="text-gray-200 group-hover:text-brand-red transition-all group-hover:translate-x-1" />
                      </div>
                   </div>
                   <div className="absolute top-0 left-0 w-1 h-full bg-brand-red/10 group-hover:bg-brand-red transition-colors" />
                </button>
              ))}
            </div>
          </m.div>
        ))}
      </m.div>

      {/* AI Assistance Promo */}
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="luxury-card bg-gray-900 p-12 text-white relative overflow-hidden"
      >
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
               <div className="inline-flex items-center gap-3 bg-brand-red/20 text-brand-red px-4 py-2 rounded-full">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Aromatic Intelligence v2.0</span>
               </div>
               <h3 className="text-3xl font-heading font-black tracking-tight">Optimization Suggestions</h3>
               <p className="text-gray-400 max-w-xl italic">Our algorithm suggests rotating your API keys and enabling multi-region redundancy for the summer peak season.</p>
            </div>
            <button className="premium-button bg-brand-red text-white py-6 px-10 hover:bg-white hover:text-gray-900 whitespace-nowrap">
               Execute Optimization
            </button>
         </div>
         <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px]" />
      </m.div>
    </div>
  );
}
