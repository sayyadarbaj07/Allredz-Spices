import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/Slice/authSlice";
import {
  User,
  Mail,
  ShoppingBag,
  ShoppingCart,
  Package,
  MessageCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const quickActions = [
    {
      label: "Shop Now",
      icon: ShoppingBag,
      path: "/products",
      description: "Browse our spice collection",
    },
    {
      label: "My Orders",
      icon: Package,
      path: "/ordersummary",
      description: "Track your orders",
    },
    {
      label: "View Cart",
      icon: ShoppingCart,
      path: "/cart",
      description: "Review your cart items",
    },
    {
      label: "Contact Us",
      icon: MessageCircle,
      path: "/contact",
      description: "Get help & support",
    },
  ];

  // Initials avatar
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ─── Hero Header ─── */}
      <div className="bg-[#8b1c1c] relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 left-[20%] w-72 h-72 bg-red-900/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-white/10 border-2 border-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
              <span className="text-2xl font-black text-white tracking-tight">{initials}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">
                Welcome back
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-white truncate">
                {user?.name || "User"}
              </h1>
              <p className="text-red-200/80 text-sm mt-1 truncate">{user?.email}</p>
            </div>

            {/* Logout — desktop */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Account Info */}
        <section>
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            My Account
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {[
              { label: "Full Name", value: user?.name, Icon: User },
              { label: "Email Address", value: user?.email, Icon: Mail },
              { label: "Account Type", value: user?.isAdmin ? "Administrator" : "Customer", Icon: ShieldCheck },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50/60 transition-colors">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#8b1c1c]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-gray-800 font-semibold mt-0.5 truncate">{value || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map(({ label, icon: Icon, path, description }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#8b1c1c]/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 p-5 flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 bg-[#8b1c1c]/8 group-hover:bg-[#8b1c1c]/12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: "rgb(139 28 28 / 0.08)" }}>
                  <Icon size={22} className="text-[#8b1c1c]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-gray-900 text-sm">{label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{description}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#8b1c1c] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="bg-[#8b1c1c] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-red-900/20 overflow-hidden relative">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 left-[40%] w-40 h-40 bg-red-900/40 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Exclusive Offer 🎉</p>
            <h3 className="text-white text-xl font-black mt-1">Fresh Spices, Delivered!</h3>
            <p className="text-red-200/80 text-sm mt-1">Shop our premium masala collection today.</p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="relative z-10 bg-white text-[#8b1c1c] font-black px-6 py-3 rounded-xl hover:bg-red-50 active:scale-95 transition-all shadow-lg flex-shrink-0 text-sm"
          >
            Shop Now →
          </button>
        </section>

        {/* Logout — mobile */}
        <button
          onClick={handleLogout}
          className="md:hidden w-full border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
