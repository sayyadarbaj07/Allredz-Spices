import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/authSlice";
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;

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
  };

  return (
    <nav className="bg-[#8b1c1c] text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-yellow-400"
            >
              {link.name}
            </Link>
          ))}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/user-dashboard")}>
                <User />
              </button>
              <button onClick={handleLogout}>
                <LogOut />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-[#8b1c1c] px-4 py-1 rounded"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#7a1818] mt-3 p-4 flex flex-col gap-3 rounded-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="py-2"
            >
              {link.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-white text-[#8b1c1c] py-2 text-center rounded"
            >
              Login
            </Link>
          ) : (
            <>
              <button onClick={() => navigate("/user-dashboard")}>
                Profile
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
