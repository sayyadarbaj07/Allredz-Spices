import React from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/Api/orderApi";
import { m, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { 
  ShoppingBag, 
  User, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCcw, 
  MoreHorizontal,
  ChevronDown
} from "lucide-react";

export default function Orders() {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();

  const statusOptions = [
    { value: "pending", color: "text-amber-500", bg: "bg-amber-50", icon: Clock },
    { value: "paid", color: "text-emerald-500", bg: "bg-emerald-50", icon: CheckCircle2 },
    { value: "processing", color: "text-blue-500", bg: "bg-blue-50", icon: RefreshCcw },
    { value: "shipped", color: "text-purple-500", bg: "bg-purple-50", icon: Truck },
    { value: "delivered", color: "text-emerald-600", bg: "bg-emerald-100", icon: CheckCircle2 },
    { value: "cancelled", color: "text-red-500", bg: "bg-red-50", icon: XCircle },
  ];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusConfig = (status) => statusOptions.find(s => s.value === status) || statusOptions[0];

  if (isLoading) return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Order <span className="text-brand-red italic">Manifest</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Manage global spice distributions</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Live</span>
           </div>
        </div>
      </div>

      <div className="luxury-card bg-white overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Transaction Details</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Patron</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Treasury</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Lifecycle</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">Workflow</th>
              </tr>
            </thead>
            <m.tbody 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center text-gray-300 font-body italic">No distributions recorded yet.</td>
                </tr>
              ) : (
                orders.map((order) => {
                  const config = getStatusConfig(order.status);
                  return (
                    <m.tr 
                      key={order._id} 
                      variants={fadeUp}
                      className="group hover:bg-[#faf9f6] transition-colors duration-500"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 border border-gray-100 group-hover:scale-110 transition-transform">
                            <ShoppingBag size={20} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-heading font-black text-gray-900 leading-none tracking-tight">#{order._id?.slice(-8).toUpperCase()}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Created: {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                              <User size={16} />
                           </div>
                           <p className="text-sm font-bold text-gray-700">{order.user?.name || "Anonymous Patron"}</p>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="space-y-1">
                           <p className="text-lg font-heading font-black text-gray-900 leading-none">₹{order.totalAmount}</p>
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                              <CreditCard size={10} /> {order.paymentMethod?.replace('_', ' ')}
                           </p>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${config.bg} ${config.color}`}>
                           <config.icon size={14} />
                           <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center justify-end gap-3">
                           <div className="relative group/select">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                disabled={updating}
                                className="appearance-none bg-white border border-gray-100 rounded-xl px-6 py-3 pr-12 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-brand-red transition-all cursor-pointer shadow-sm outline-none"
                              >
                                {statusOptions.map((s) => (
                                  <option key={s.value} value={s.value}>
                                    {s.value.toUpperCase()}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-hover/select:text-brand-red transition-colors" size={14} />
                           </div>
                           <button className="w-10 h-11 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-colors">
                              <MoreHorizontal size={18} />
                           </button>
                        </div>
                      </td>
                    </m.tr>
                  );
                })
              )}
            </m.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
