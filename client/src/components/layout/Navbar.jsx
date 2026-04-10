import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/authSlice";
import {
  ShoppingBag,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";


import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Read from Redux (reactive — updates on login/logout without page refresh)
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin === true;

  // Load and listen for cart changes
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
    dispatch(logout()); // clears Redux + localStorage (token, role, user)
    navigate("/");
  };

  return (
    <nav className="bg-[#8b1c1c] text-white p-4 sticky top-0 z-50 shadow-lg font-sans">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Allredz Logo"
            style={{
              height: "46px",
              width: "auto",
              maxWidth: "150px",
              objectFit: "contain",
              display: "block",
              borderRadius: "6px",
              backgroundColor: "#8b1c1c",
              padding: "3px 6px",
            }}
          />
        </Link>

        {/* ─── Desktop Menu ─── */}
        <div className="hidden md:flex space-x-8 items-center font-bold tracking-wide">
          <Link to="/" className="text-sm uppercase hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/products" className="text-sm uppercase hover:text-yellow-400 transition-colors">Products</Link>
          <Link to="/about" className="text-sm uppercase hover:text-yellow-400 transition-colors">About</Link>

          {/* Cart */}
          <Link to="/cart" className="relative group p-2 hover:bg-white/10 rounded-xl transition-all">
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#8b1c1c] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#8b1c1c] shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 ml-2 pl-6 border-l border-white/20">
              {/* Profile button for all logged-in users */}
              <button
                onClick={() => navigate("/user-dashboard")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                title="My Profile"
              >
                <User size={18} />
                Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-xl text-red-200 hover:text-white transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            /* ✅ Not logged in → Login button only (no admin login button) */
            <Link
              to="/login"
              className="bg-white text-[#8b1c1c] px-6 py-2 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all shadow-lg active:scale-95"
            >
              Login
            </Link>
          )}
        </div>

        {/* ─── Mobile: cart + hamburger ─── */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#8b1c1c] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#8b1c1c]">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Dropdown ─── */}
      {isOpen && (
        <div className="md:hidden bg-[#7a1818] rounded-2xl mt-4 p-4 flex flex-col space-y-2 border border-white/10 shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 font-bold hover:bg-white/10 rounded-xl transition-colors">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="px-4 py-3 font-bold hover:bg-white/10 rounded-xl transition-colors">Products</Link>

          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
            {!isLoggedIn ? (
              /* Not logged in → Login only */
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-white text-[#8b1c1c] py-4 text-center rounded-xl font-black uppercase tracking-widest"
              >
                Login
              </Link>
            ) : (
              <>
                {/* Profile button for all logged-in users */}
                <button
                  onClick={() => { setIsOpen(false); navigate("/user-dashboard"); }}
                  className="bg-white/10 hover:bg-white/20 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <User size={20} />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="border border-white/20 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
