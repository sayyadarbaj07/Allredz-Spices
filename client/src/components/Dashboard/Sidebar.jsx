import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Menu, 
  X,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(true);
      else setIsOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => {
    if (path === "/dashboardlayout") {
      return location.pathname === path || location.pathname === "/dashboardlayout/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: "Overview", path: "/dashboardlayout", icon: LayoutDashboard },
    { name: "Spices", path: "/dashboardlayout/products", icon: Package },
    { name: "Orders", path: "/dashboardlayout/orders", icon: ShoppingBag },
    { name: "Customers", path: "/dashboardlayout/users", icon: Users },
    { name: "Settings", path: "/dashboardlayout/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-[60] shadow-sm backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-red/20">
            <Sparkles size={20} />
          </div>
          <h2 className="text-xl font-heading font-black tracking-tight text-gray-900">Allredz <span className="text-brand-red">Admin</span></h2>
        </div>
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 hover:text-brand-red transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <m.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-100 flex flex-col py-10 px-8 shadow-[20px_0_60px_rgba(0,0,0,0.02)] z-50 lg:static lg:h-auto`}
          >
            <div className="mb-16 flex items-center gap-4">
               <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-brand-red/30">
                  <Sparkles size={24} />
               </div>
               <div className="flex flex-col">
                  <h2 className="text-2xl font-heading font-black text-gray-900 leading-none">Allredz</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red opacity-60">Elite Control</p>
               </div>
            </div>

            <nav className="flex-1">
              <ul className="space-y-4">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      className={`relative flex items-center gap-4 p-5 rounded-3xl transition-all duration-500 group ${
                        isActive(item.path) 
                          ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/20" 
                          : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    >
                      <item.icon size={20} className={`transition-transform duration-500 group-hover:scale-110 ${isActive(item.path) ? "text-brand-red" : ""}`} />
                      <span className="font-heading font-bold text-sm tracking-wide">{item.name}</span>
                      
                      {isActive(item.path) && (
                        <m.div 
                          layoutId="active-pill"
                          className="absolute right-4 w-1.5 h-1.5 rounded-full bg-brand-red"
                        />
                      )}
                      
                      {!isActive(item.path) && (
                        <ArrowRight size={14} className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto p-8 bg-gray-50 rounded-[2.5rem] relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Status</p>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-xs font-bold text-gray-900">Vault Secure</span>
                  </div>
               </div>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </m.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
