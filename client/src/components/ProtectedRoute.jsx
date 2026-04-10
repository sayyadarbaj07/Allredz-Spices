import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Token check
  if (!token || !user) {
    // Redirect to admin-login if trying to access admin pages, otherwise login
    const redirectPath = adminOnly ? "/admin-login" : "/login";
    return <Navigate to={redirectPath} replace />;
  }

  // Admin role check if required
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
