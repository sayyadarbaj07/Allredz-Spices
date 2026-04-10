import React from "react";

const OrderSummary = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with Allredz. Your order has been received.
        </p>

        <div className="border-t pt-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Order Details
          </h3>
          <p>
            <span className="font-medium">Order ID:</span> #ORD12345
          </p>
          <p>
            <span className="font-medium">Date:</span> 8 Nov 2025
          </p>
          <p>
            <span className="font-medium">Total:</span> ₹350
          </p>
          <p>
            <span className="font-medium">Payment:</span> Cash on Delivery
          </p>
        </div>

        <div className="mt-8">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
