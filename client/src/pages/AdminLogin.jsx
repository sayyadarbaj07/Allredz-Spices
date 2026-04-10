import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/Api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/Slice/authSlice";
import { Lock, Mail, Eye, EyeOff, ChevronLeft, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [adminLogin] = useAdminLoginMutation();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await adminLogin(form).unwrap();

            // Server already rejects non-admins with 403
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", "admin");
            dispatch(setCredentials(res));
            navigate("/dashboardlayout", { replace: true });
        } catch (err) {
            setError(err?.data?.message || "Invalid credentials for admin access.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[420px]">
                {/* Simple Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8b1c1c] text-white rounded-2xl mb-6 shadow-lg shadow-red-900/20">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h1>
                    <p className="text-gray-500 mt-2 font-medium">Secure authentication for administrators</p>
                </div>

                {/* Login Card - Crystal Effect */}
                <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl shadow-black/5 p-10 border border-white/20 relative overflow-hidden">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8b1c1c] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="admin@allredz.com"
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b1c1c]/10 focus:border-[#8b1c1c] focus:bg-white transition-all"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8b1c1c] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-12 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b1c1c]/10 focus:border-[#8b1c1c] focus:bg-white transition-all"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8b1c1c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/10 hover:bg-[#7a1818] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide"
                        >
                            {loading ? "Authenticating..." : "Login to Dashboard"}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
                        <Link to="/" className="text-gray-500 hover:text-[#8b1c1c] transition-colors text-sm font-bold flex items-center gap-2">
                            <ChevronLeft size={16} />
                            Return to Storefront
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
