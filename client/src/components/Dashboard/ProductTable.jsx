import React from "react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/Api/productApi";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Package, CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const ProductsTable = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const { fadeUp, staggerContainer, viewportSettings } = useScrollAnimation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exquisite spice?")) {
      try {
        await deleteProduct(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading) return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin" />
    </div>
  );

  if (isError) return (
    <div className="luxury-card bg-red-50 p-8 text-center">
      <p className="text-red-800 font-bold">Failed to sync with the aromatic vault.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search our collection..." 
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
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Spice Detail</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Category</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Inventory</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Status</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <m.tbody 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <m.tr 
                  key={product._id} 
                  variants={fadeUp}
                  className="group hover:bg-[#faf9f6] transition-colors duration-500"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 p-2 flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-110 transition-transform">
                        {product.image ? (
                          <img 
                            src={product.image?.startsWith("/uploads/") ? `${import.meta.env.VITE_API_URL || ""}${product.image}` : product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Package className="text-gray-300" size={24} />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-heading font-black text-gray-900 leading-none">{product.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-red opacity-60">Master Batch #{product._id?.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="px-4 py-2 rounded-full bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {product.category || "Blend"}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="space-y-2">
                      {product.sizes?.map((s, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.weight || s.size}</span>
                          <div className="h-[1px] flex-1 bg-gray-100 min-w-[20px]" />
                          <span className="text-sm font-heading font-black text-gray-900">₹{s.price}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-8">
                    {product.inStock ? (
                      <div className="flex items-center gap-2 text-emerald-500">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <XCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Depleted</span>
                      </div>
                    )}
                  </td>
                  <td className="p-8">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => navigate(`/dashboardlayout/products/edit/${product._id}`)}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red transition-all shadow-sm"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </m.tr>
              ))}
            </m.tbody>
          </table>
        </div>
        
        {/* Pagination Shadow */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {products.length} Spices</p>
           <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 cursor-not-allowed">
                 <Search size={14} className="rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-red transition-all shadow-sm">
                 <Search size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

