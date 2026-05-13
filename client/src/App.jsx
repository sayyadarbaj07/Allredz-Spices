import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation, AnimatePresence, motion } from "framer-motion";

// Layouts
import Navbar from "./components/layout/Navbar";
import Footer from "./pages/Footer";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import Recipes from "./pages/Recipes";
import SpiceProcess from "./pages/SpiceProcess";
import FounderMessage from "./pages/FounderMessage";
import IngredientsShowcase from "./pages/IngredientsShowcase";
import StatsCounter from "./pages/StatsCounter";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
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

import LazySection from "./components/common/LazySection";

const App = () => {
  const location = useLocation();

  // ✅ Hide Navbar & Footer only for dashboard layout
  const hideLayout = location.pathname.startsWith("/dashboardlayout");

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full overflow-x-hidden selection:bg-brand-red selection:text-white">
        {!hideLayout && <Navbar />}

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Suspense fallback={
              <div className="h-screen w-full flex items-center justify-center bg-[#faf9f6]">
                <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes location={location}>
                {/* 🌐 Public Routes */}
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col">
                      <Home />
                      <LazySection height="800px"><Products /></LazySection>
                      <LazySection height="1200px"><SpiceProcess /></LazySection>
                      <LazySection height="1600px"><IngredientsShowcase /></LazySection>
                      <LazySection height="400px"><StatsCounter /></LazySection>
                      <LazySection height="700px"><FounderMessage /></LazySection>
                      <LazySection height="1500px"><Recipes /></LazySection>
                      <LazySection height="600px"><Testimonials /></LazySection>
                      <LazySection height="600px"><FAQ /></LazySection>
                      <LazySection height="800px"><AboutUs /></LazySection>
                      <LazySection height="800px"><Contact /></LazySection>
                    </div>
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
                    element={<DashboardProducts />}
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
            </Suspense>
          </motion.main>
        </AnimatePresence>

        {!hideLayout && <Footer />}
      </div>
    </LazyMotion>
  );
};

export default App;

