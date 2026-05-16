/* v2.1 - Enhanced Responsiveness & Animations */
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/authSlice";
import { ShoppingBag, User, LogOut, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence, m } from "framer-motion";
import logo from "../../assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    window.addEventListener("focus", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-brand-red/90 backdrop-blur-md py-2 shadow-2xl" 
          : "bg-brand-red py-4 md:py-6 shadow-md"
      }`}
    >
      <div className="section-container flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-3 md:gap-5 group" onClick={() => setIsOpen(false)}>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition duration-700"></div>
            
            <div className="relative h-10 w-10 md:h-16 md:w-16 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-white/50 transform group-hover:scale-110 transition-all duration-700 overflow-hidden">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-full w-full object-cover relative z-10 p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-brand-red font-black text-xl">A</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-display font-black tracking-[0.15em] text-white leading-none group-hover:text-yellow-400 transition-colors duration-500">
              ALLREDZ
            </h1>
            <div className="flex items-center gap-1 mt-0.5 md:mt-1">
              <div className="h-[1px] w-4 md:w-6 bg-yellow-400 group-hover:w-full transition-all duration-700"></div>
              <span className="text-yellow-400 text-[7px] md:text-[9px] lg:text-[10px] tracking-[0.4em] lg:tracking-[0.6em] font-body font-bold uppercase text-nowrap">Spices</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative font-body font-bold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 group py-2 ${
                location.pathname === link.path ? "text-yellow-400" : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full ${
                location.pathname === link.path ? "w-full" : ""
              }`}></span>
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Search - Desktop */}
          <button className="text-white hover:text-yellow-400 transition-all hover:scale-110 p-2 hidden md:block">
            <Search size={20} />
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 text-white hover:text-yellow-400 transition-all hover:scale-110 group">
            <ShoppingBag size={22} className="md:w-[24px] md:h-[24px]" />
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-brand-red text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-brand-red group-hover:scale-125 transition-transform duration-500">
              {cartCount}
            </span>
          </Link>

          {/* Auth/Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            {isLoggedIn ? (
              <button 
                onClick={() => navigate("/user-dashboard")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white p-2 md:px-4 md:py-2 rounded-full transition-all border border-white/20 hover:border-white/40 shadow-sm"
                title="Dashboard"
              >
                <User size={18} />
                <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">Profile</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-brand-red hover:bg-yellow-400 hover:text-black px-5 py-2 md:px-8 md:py-3 rounded-full text-[9px] md:text-[10px] font-body font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl hover:shadow-yellow-400/20"
              >
                Login
              </Link>
            )}
            
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                className="hidden md:flex text-white/60 hover:text-yellow-400 transition-colors p-2"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all active:scale-90 z-[1200]"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[1100] overflow-hidden">
            {/* Backdrop with Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-brand-red text-white">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <span className="text-xl font-display font-black text-brand-red">A</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-sm font-display font-black tracking-widest leading-none">ALLREDZ</span>
                      <span className="text-[8px] font-body font-bold tracking-[0.4em] uppercase text-yellow-400 mt-1">Spices</span>
                   </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-grow overflow-y-auto py-10 px-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                        location.pathname === link.path 
                          ? "bg-brand-red/5 text-brand-red" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-brand-red"
                      }`}
                    >
                      <span className="text-lg font-heading font-black tracking-tight">{link.name}</span>
                      <motion.span 
                        animate={location.pathname === link.path ? { x: [0, 5, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={location.pathname === link.path ? "text-brand-red" : "text-gray-300"}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-4">
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="premium-button w-full bg-brand-red text-white py-5 shadow-xl hover:bg-black transition-all"
                  >
                    Login / Create Account
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={() => { navigate("/user-dashboard"); setIsOpen(false); }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-gray-200 text-brand-red font-bold shadow-sm hover:bg-brand-red hover:text-white transition-all"
                    >
                      <User size={20} />
                      User Dashboard
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-red transition-colors"
                    >
                      Logout Session
                    </button>
                  </div>
                )}
                <p className="text-center text-[10px] font-body font-bold text-gray-300 uppercase tracking-widest pt-4">
                  © 2026 Allredz Spices
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


