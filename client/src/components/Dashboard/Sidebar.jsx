// src/components/Dashboard/Sidebar.jsx
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaBox,
//   FaClipboardList,
//   FaUsers,
//   FaCog,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   // Desktop me sidebar hamesha visible rahe
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setIsOpen(true);
//       else setIsOpen(false);
//     };
//     handleResize(); // mount par run
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ✅ Sidebar link highlight karne ke liye
//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 bg-[#D32F2F] text-white p-3 rounded-md shadow-md"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-[#0E402D] text-white flex flex-col py-8 px-6 rounded-r-3xl shadow-lg transform transition-transform duration-300 z-40
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
//       >
//         <h2 className="text-2xl font-extrabold mb-10 text-center lg:text-left">
//           Allredz Spices
//         </h2>

//         <ul className="space-y-4">
//           <li
//             className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
//               isActive("/dashboard") ? "bg-[#145C3F]" : ""
//             }`}
//           >
//             <Link to="/dashboard" className="flex items-center gap-3 w-full">
//               <FaTachometerAlt /> Dashboard
//             </Link>
//           </li>

//           <li
//             className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
//               isActive("/dashboard/products/add") ? "bg-[#145C3F]" : ""
//             }`}
//           >
//             <Link
//               to="/dashboard/products/add"
//               className="flex items-center gap-3 w-full"
//             >
//               <FaBox /> Products
//             </Link>
//           </li>

//           <li
//             className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
//               isActive("/dashboard/orders") ? "bg-[#145C3F]" : ""
//             }`}
//           >
//             <Link
//               to="/dashboard/orders"
//               className="flex items-center gap-3 w-full"
//             >
//               <FaClipboardList /> Orders
//             </Link>
//           </li>

//           <li
//             className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
//               isActive("/dashboard/users") ? "bg-[#145C3F]" : ""
//             }`}
//           >
//             <Link
//               to="/dashboard/users"
//               className="flex items-center gap-3 w-full"
//             >
//               <FaUsers /> Users
//             </Link>
//           </li>

//           <li
//             className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
//               isActive("/dashboard/settings") ? "bg-[#145C3F]" : ""
//             }`}
//           >
//             <Link
//               to="/dashboard/settings"
//               className="flex items-center gap-3 w-full"
//             >
//               <FaCog /> Settings
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Overlay for mobile */}
//       {isOpen && window.innerWidth < 1024 && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#D32F2F] text-white p-3 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-[#0E402D] text-white flex flex-col py-8 px-6 rounded-r-3xl shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h2 className="text-2xl font-extrabold mb-10 text-center lg:text-left">
          Allredz Spices
        </h2>

        <ul className="space-y-4">
          <li
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
              isActive("/dashboardlayout") ? "bg-[#145C3F]" : ""
            }`}
          >
            <Link
              to="/dashboardlayout"
              className="flex items-center gap-3 w-full"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
              isActive("/dashboardlayout/products") ? "bg-[#145C3F]" : ""
            }`}
          >
            <Link
              to="/dashboardlayout/products"
              className="flex items-center gap-3 w-full"
            >
              <FaBox /> Products
            </Link>
          </li>

          <li
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
              isActive("/dashboardlayout/orders") ? "bg-[#145C3F]" : ""
            }`}
          >
            <Link
              to="/dashboardlayout/orders"
              className="flex items-center gap-3 w-full"
            >
              <FaClipboardList /> Orders
            </Link>
          </li>

          <li
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
              isActive("/dashboardlayout/users") ? "bg-[#145C3F]" : ""
            }`}
          >
            <Link
              to="/dashboardlayout/users"
              className="flex items-center gap-3 w-full"
            >
              <FaUsers /> Users
            </Link>
          </li>

          <li
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#145C3F] cursor-pointer transition ${
              isActive("/dashboardlayout/settings") ? "bg-[#145C3F]" : ""
            }`}
          >
            <Link
              to="/dashboardlayout/settings"
              className="flex items-center gap-3 w-full"
            >
              <FaCog /> Settings
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
