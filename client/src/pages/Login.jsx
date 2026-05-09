import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/Slice/authSlice";
import { m, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { fadeUp, scaleIn } = useScrollAnimation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form).unwrap();
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.isAdmin ? "admin" : "user");
      dispatch(setCredentials(res));
      navigate(res.isAdmin ? "/dashboardlayout" : "/user-dashboard", { replace: true });
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 font-body overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/10 rounded-full blur-[150px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-100/5 rounded-full blur-[120px] -z-10" />

      <m.div variants={scaleIn} initial="hidden" animate="visible" className="w-full max-w-[480px] relative">
        <m.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-4 group">
             <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-red/30">
                <Sparkles size={28} />
             </div>
             <h1 className="text-4xl font-heading font-black tracking-tight text-gray-900">Allredz.</h1>
          </Link>
          <div className="mt-8 space-y-2">
             <h2 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Welcome Back</h2>
             <p className="text-sm text-gray-400 font-medium italic">Continue your aromatic journey</p>
          </div>
        </m.div>

        <div className="luxury-card bg-white p-12 md:p-16 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red to-brand-gold opacity-60" />
          
          <AnimatePresence mode="wait">
            {error && (
              <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <Lock size={12} /> {error}
              </m.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Secure Email</label>
              <div className="relative group/input">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-brand-red transition-colors">
                  <Mail size={18} />
                </div>
                <input type="email" name="email" placeholder="patron@allredz.com" value={form.email} onChange={handleChange} required className="w-full bg-gray-50 border-none rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-brand-red/10 transition-all outline-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Access Key</label>
              <div className="relative group/input">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-brand-red transition-colors">
                  <Lock size={18} />
                </div>
                <input type={showPass ? "text" : "password"} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="w-full bg-gray-50 border-none rounded-2xl pl-16 pr-16 py-5 text-sm font-bold text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-brand-red/10 transition-all outline-none" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-red transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="premium-button w-full bg-brand-red text-white py-6 shadow-2xl hover:bg-gray-900 group h-20">
              {isLoading ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" /> : <span className="flex items-center gap-3 justify-center">Authenticate <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></span>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col items-center gap-6">
             <Link to="/register" className="inline-flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                Create Account <ArrowRight size={14} />
             </Link>
          </div>
        </div>

        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 flex justify-center gap-8 text-gray-300">
           <div className="flex items-center gap-3">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Encrypted</span>
           </div>
        </m.div>
      </m.div>
    </div>
  );
};

export default Login;
