import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/Slice/authSlice";
import { m, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { 
  User, 
  Mail, 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  MessageCircle, 
  LogOut, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star,
  Settings
} from "lucide-react";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { fadeUp, staggerContainer, scaleIn } = useScrollAnimation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;

  const quickActions = [
    { label: "Active Orders", icon: Package, value: "02", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Loyalty Points", icon: Star, value: "1,250", color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Curated Selection", icon: ShoppingCart, value: "05", color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-24 px-6 font-body overflow-hidden relative">
      {/* Cinematic Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/10 rounded-full blur-[150px] -z-10 animate-pulse-glow" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Patron Portal</span>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-gray-900 tracking-tight">
              Welcome, <span className="italic text-brand-red glow-text">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Member since 2024 • Elite Status</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="group flex items-center gap-4 bg-white p-2 pr-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-red/20 transition-all duration-500"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand-red group-hover:text-white transition-all">
               <LogOut size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900">Sign Out</span>
          </button>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Side */}
          <m.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 space-y-12"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {quickActions.map((action, i) => (
                <m.div 
                  key={i}
                  variants={fadeUp}
                  className="luxury-card bg-white p-8 group hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500"
                >
                   <div className={`w-14 h-14 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <action.icon size={24} />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{action.label}</p>
                      <h3 className="text-3xl font-heading font-black text-gray-900 tracking-tight">{action.value}</h3>
                   </div>
                </m.div>
              ))}
            </div>

            {/* Interaction Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <m.div variants={fadeUp} className="luxury-card bg-gray-900 p-10 text-white relative overflow-hidden group">
                  <div className="relative z-10 space-y-8">
                     <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center">
                        <ShoppingBag size={24} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-heading font-black tracking-tight">Recent Acquisitions</h3>
                        <p className="text-xs text-gray-400 font-medium italic">Track your ongoing distributions</p>
                     </div>
                     <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-red hover:text-white transition-colors">
                        View History <ArrowRight size={14} />
                     </button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-red/10 rounded-full blur-[60px]" />
               </m.div>

               <m.div variants={fadeUp} className="luxury-card bg-white p-10 border border-gray-100 group">
                  <div className="space-y-8">
                     <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                        <Sparkles size={24} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-heading font-black text-gray-900 tracking-tight">Aromatic Vault</h3>
                        <p className="text-xs text-gray-400 font-medium italic">Exclusive offers for our patrons</p>
                     </div>
                     <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-red transition-colors">
                        Enter Vault <ArrowRight size={14} />
                     </button>
                  </div>
               </m.div>
            </div>
          </m.div>

          {/* Profile Sidebar */}
          <m.aside 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-8"
          >
            <div className="luxury-card bg-white p-10 border border-gray-100 shadow-sm">
               <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                     <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-300 border-4 border-white shadow-xl">
                        <User size={48} strokeWidth={1} />
                     </div>
                     <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                        <ShieldCheck size={14} />
                     </div>
                  </div>
                  
                  <div className="space-y-1">
                     <h2 className="text-2xl font-heading font-black text-gray-900">{user.name}</h2>
                     <p className="text-sm font-medium text-gray-400 italic">{user.email}</p>
                  </div>

                  <div className="w-full pt-6 border-t border-gray-50 space-y-4">
                     {[
                       { label: "Profile Identity", icon: User },
                       { label: "Secure Auth", icon: ShieldCheck },
                       { label: "Notification Nodes", icon: MessageCircle },
                       { label: "System Preferences", icon: Settings },
                     ].map((item, i) => (
                       <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 group transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-brand-red transition-colors">
                                <item.icon size={16} />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900">{item.label}</span>
                          </div>
                          <ArrowRight size={14} className="text-gray-200 group-hover:text-brand-red transition-all group-hover:translate-x-1" />
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </m.aside>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
