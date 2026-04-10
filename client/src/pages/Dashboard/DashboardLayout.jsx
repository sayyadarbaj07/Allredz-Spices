import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials, logout } from "../../redux/Slice/authSlice";
import { useGetDashboardStatsQuery } from "../../redux/Api/orderApi";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user: reduxUser } = useSelector((state) => state.auth);

  // Fallback to localStorage if Redux is empty
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || userFromStorage;

  // Sync Redux with localStorage
  useEffect(() => {
    if (!reduxUser && userFromStorage) {
      dispatch(setCredentials(userFromStorage));
    }
  }, [reduxUser, userFromStorage, dispatch]);

  // Admin & token check
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FFF7E0] font-sans relative">
      <Sidebar />
      <div className="flex-1 p-5 sm:p-8 lg:p-10 mt-14 lg:mt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              ➕ Add Product
            </button>

            <button
              onClick={handleLogout}
              className="bg-[#D32F2F] text-white px-5 py-2 rounded-md hover:bg-[#B71C1C] transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
            <h3 className="text-gray-600 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : stats?.totalOrders ?? 0}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
            <h3 className="text-gray-600 mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : `₹${stats?.totalRevenue ?? 0}`}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
            <h3 className="text-gray-600 mb-2">Customers</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : stats?.totalCustomers ?? 0}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
            <h3 className="text-gray-600 mb-2">Products Sold</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : stats?.totalProductsSold ?? 0}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
            <h3 className="text-gray-600 mb-2">Products in Stock</h3>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : stats?.totalStock ?? 0}
            </p>
          </div>
        </div>

        {/* Nested pages */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
