import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // Fetch last order from backend (unchanged logic)
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL || ""}/api/order/my-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setOrder(data[data.length - 1]);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fef6ed] via-white to-[#fde8d8] p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-green-100"
      >
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 pt-10 pb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-black text-white">Thank You!</h1>
          <p className="text-green-100 mt-1 text-sm">Your order has been placed successfully.</p>
        </div>

        {/* Order Details */}
        <div className="p-8">
          {order && order.items?.length > 0 ? (
            <div className="mb-6">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {(order.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-700 font-medium">
                      {item.product?.name || "Unknown Product"}
                      <span className="text-gray-400 ml-1">× {item.qty || 0}</span>
                    </span>
                    <span className="font-bold text-gray-800 text-sm">
                      ₹{(item.size?.price || 0) * (item.qty || 0)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                <span className="font-black text-gray-700 text-lg">Total Paid</span>
                <span className="font-black text-green-600 text-xl">₹{order.totalAmount || 0}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 mb-4">
              <p className="text-gray-400 text-sm">🎉 Your order is being processed!</p>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-[#7b1d1d] to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-red-900/30 active:scale-95 transition-all duration-200 text-base"
          >
            Continue Shopping 🛍️
          </button>

          <button
            onClick={() => navigate("/user-dashboard")}
            className="w-full mt-3 bg-gray-50 border border-gray-200 text-gray-600 font-semibold py-3 rounded-2xl hover:bg-gray-100 active:scale-95 transition-all duration-200 text-sm"
          >
            View My Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
