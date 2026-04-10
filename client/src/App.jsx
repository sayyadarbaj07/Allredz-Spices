import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layouts
import Navbar from "./components/layout/Navbar";
import Footer from "./pages/Footer";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import ProductList from "./pages/ProductList";

// Dashboard Pages
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Orders from "./pages/Dashboard/Orders";
import Users from "./pages/Dashboard/Users";
import Settings from "./pages/Dashboard/Settings";
import ProductAdd from "./pages/Dashboard/ProductAdd";
import DashboardProducts from "./pages/Dashboard/DashboardProducts";
import EditProduct from "./pages/Dashboard/EditProduct";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  const location = useLocation();

  // ✅ Hide Navbar & Footer only for dashboard layout
  const hideLayout = location.pathname.startsWith("/dashboardlayout");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* 🌐 Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Products />
              <AboutUs />
              <Contact />
            </>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordersummary"
          element={
            <ProtectedRoute>
              <OrderSummary />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/products/list" element={<ProductList />} />

        {/* ⭐ Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 👤 User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🧑‍💼 Protected Dashboard Routes */}
        <Route
          path="/dashboardlayout/*" // ✅ Add /* for nested routes
          element={
            <ProtectedRoute adminOnly={true}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>
            }
          />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ❌ 404 Page */}
        <Route path="*" element={<h1 className="p-10">Page Not Found</h1>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
