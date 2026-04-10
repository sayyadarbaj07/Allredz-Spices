import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/Slice/authSlice";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-black tracking-tighter text-[#8b1c1c]">
            ALLREDZ<span className="text-yellow-600">.</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mt-6 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Log in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 p-10 border border-gray-100">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <span>⚠️ {error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8b1c1c] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b1c1c]/10 focus:border-[#8b1c1c] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8b1c1c] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b1c1c]/10 focus:border-[#8b1c1c] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8b1c1c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/10 hover:bg-[#7a1818] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2 group"
            >
              {isLoading ? "Signing in..." : (
                <>
                  Continue
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-medium">
            New here?{" "}
            <Link to="/register" className="text-[#8b1c1c] font-bold hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
