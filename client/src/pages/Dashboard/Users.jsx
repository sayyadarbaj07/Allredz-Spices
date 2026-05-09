import React from "react";
import { useGetAllUsersQuery } from "../../redux/Api/authApi";
import { m, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Users as UsersIcon, Mail, ShieldCheck, Calendar, Search, Filter, ShieldAlert } from "lucide-react";

const Users = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const { fadeUp, staggerContainer } = useScrollAnimation();

  if (isLoading) return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="luxury-card bg-red-50 p-8 text-center">
      <p className="text-red-800 font-bold">Failed to sync with the patron database.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Patron <span className="text-brand-red italic">Directory</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Total Authenticated: {users?.length || 0}</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Database Secure</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search patron by name or email..." 
            className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold shadow-sm focus:ring-2 focus:ring-brand-red/10 outline-none placeholder:text-gray-300"
          />
        </div>
        <button className="w-12 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm text-gray-400 hover:text-brand-red transition-colors">
          <Filter size={18} />
        </button>
      </div>

      <div className="luxury-card bg-white overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Patron Detail</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Security Rank</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Enrolled Since</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">Interactions</th>
              </tr>
            </thead>
            <m.tbody 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {users?.map((user) => (
                <m.tr 
                  key={user._id} 
                  variants={fadeUp}
                  className="group hover:bg-[#faf9f6] transition-colors duration-500"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-xl shadow-gray-900/10 uppercase font-heading font-black text-lg">
                        {user.name?.charAt(0) || "P"}
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-heading font-black text-gray-900 leading-none">{user.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                           <Mail size={10} className="text-brand-red" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'}`}>
                       {user.role === 'admin' ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
                       <span className="text-[10px] font-black uppercase tracking-widest">{user.role === 'admin' ? "Archon" : "Patron"}</span>
                    </div>
                  </td>
                  <td className="p-8">
                     <div className="flex items-center gap-3 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-sm font-bold">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                     </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center justify-end gap-3">
                       <button className="px-6 py-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
                          Inspect Account
                       </button>
                    </div>
                  </td>
                </m.tr>
              ))}
            </m.tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
