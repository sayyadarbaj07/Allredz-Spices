import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials, logout } from "../../redux/Slice/authSlice";
import { useGetDashboardStatsQuery } from "../../redux/Api/orderApi";
import { m, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Plus, LogOut, TrendingUp, Users, ShoppingBag, Box, IndianRupee } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user: reduxUser } = useSelector((state) => state.auth);
  const { fadeUp, staggerContainer, viewportSettings, scaleIn } = useScrollAnimation();

  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || userFromStorage;

  useEffect(() => {
    if (!reduxUser && userFromStorage) {
      dispatch(setCredentials(userFromStorage));
    }
  }, [reduxUser, userFromStorage, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/admin-login", { replace: true });
    }
  }, [navigate]);

  const { data: stats, isLoading } = useGetDashboardStatsQuery(undefined, {
    skip: !user?.token,
  });

  const handleAddProduct = () => {
    navigate("/dashboardlayout/products/add");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  const statConfig = [
    { label: "Total Revenue", value: stats?.totalRevenue, icon: IndianRupee, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Total Orders", value: stats?.totalOrders, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Total Customers", value: stats?.totalCustomers, icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Stock Units", value: stats?.totalStock, icon: Box, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#faf9f6] font-body relative overflow-x-hidden selection:bg-brand-red selection:text-white">
      {/* Dynamic Background Decor */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-red-100/10 rounded-full blur-[120px] pointer-events-none -z-0" />
      
      <Sidebar />

      <main className="flex-1 relative z-10 p-4 sm:p-8 lg:p-12 mt-20 lg:mt-0 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
        >
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-heading font-black text-gray-900 tracking-tight">
              Aromatic <span className="text-brand-red italic">Intelligence</span>
            </h1>
            <p className="text-sm text-gray-400 font-medium">Welcome back, {user.name || 'Administrator'}</p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleAddProduct}
              className="premium-button flex-1 sm:flex-none bg-brand-red text-white hover:bg-gray-900 group"
            >
              <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-500" />
              Add Spice
            </button>

            <button
              onClick={handleLogout}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-brand-red hover:border-brand-red transition-all shadow-sm"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </m.div>

        {/* Stats Grid */}
        <m.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statConfig.map((stat, i) => (
            <m.div 
              key={i}
              variants={fadeUp}
              className="luxury-card bg-white p-8 group hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                  <TrendingUp size={12} /> +12%
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
                <h3 className="text-3xl font-heading font-black text-gray-900 leading-none tracking-tight">
                  {isLoading ? "..." : (stat.value ?? 0).toLocaleString()}
                </h3>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Content Outlet */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative min-h-[500px]"
        >
          <Outlet />
        </m.div>
      </main>
    </div>
  );
};

export default DashboardLayout;

