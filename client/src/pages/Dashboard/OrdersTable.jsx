import React from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/Api/orderApi";

export default function OrdersTable() {
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const statusOptions = [
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  };

  if (isLoading)
    return <p className="text-center mt-6 text-gray-700">Loading Orders...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-600">
        Error loading orders: {error?.data?.message || error.message}
      </p>
    );
  if (!orders.length)
    return <p className="text-center mt-6 text-gray-700">No orders found.</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-6 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-700">All Orders</h1>
      <table className="w-full min-w-[800px] border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">User</th>
            <th className="p-3 border">Products</th>
            <th className="p-3 border">Qty</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Payment</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr
              key={o._id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="p-3 border break-words font-mono text-xs">
                {o._id}
              </td>
              <td className="p-3 border">{o.user?.name || "Guest"}</td>
              <td className="p-3 border">
                {o.items.map((i) => (
                  <div key={i.product?._id}>
                    {i.product?.name || "Product"} ({i.size.weight})
                  </div>
                ))}
              </td>
              <td className="p-3 border">
                {o.items.reduce((total, i) => total + i.qty, 0)}
              </td>
              <td className="p-3 border font-semibold text-green-700">
                ₹ {o.totalAmount}
              </td>
              <td
                className={`p-3 border font-medium ${
                  o.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {o.paymentMethod} ({o.paymentStatus})
              </td>
              <td
                className={`p-3 border font-bold ${
                  o.status === "delivered"
                    ? "text-green-700"
                    : o.status === "cancelled"
                    ? "text-red-700"
                    : "text-yellow-600"
                }`}
              >
                {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
              </td>
              <td className="p-3 border">
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                  className="border px-2 py-1 rounded bg-white hover:bg-gray-100 transition"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
