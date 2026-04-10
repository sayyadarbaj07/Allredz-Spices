import React from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/Api/orderApi";
export default function Orders() {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  const [updateStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  const statusOptions = [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      alert("Order status updated successfully!");
    } catch (err) {
      alert("Failed to update status!");
    }
  };

  if (isLoading)
    return <p className="p-6 text-lg font-semibold">Loading Orders...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5">All Orders</h2>

      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-2 border">{o._id}</td>
                <td className="p-2 border">{o.user?.name || "Guest"}</td>
                <td className="p-2 border">₹ {o.totalAmount}</td>
                <td className="p-2 border">{o.paymentMethod}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      o.status === "pending"
                        ? "bg-yellow-500"
                        : o.status === "paid"
                        ? "bg-green-600"
                        : o.status === "processing"
                        ? "bg-blue-500"
                        : o.status === "shipped"
                        ? "bg-indigo-600"
                        : o.status === "delivered"
                        ? "bg-green-700"
                        : "bg-red-600"
                    }`}
                  >
                    {o.status.toUpperCase()}
                  </span>
                </td>

                <td className="p-2 border">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    disabled={updating}
                    className="border p-2 rounded bg-white"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
