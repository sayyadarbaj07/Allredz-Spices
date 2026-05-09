import React from "react";
import { m } from "framer-motion";
import ProductsTable from "../../components/Dashboard/ProductTable";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Sparkles, Package } from "lucide-react";

const DashboardProducts = () => {
  const { fadeUp } = useScrollAnimation();

  return (
    <m.div 
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Spice <span className="text-brand-red italic">Inventory</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Manage your premium collection of aromatic treasures</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <Package size={16} className="text-brand-red" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Vault</span>
           </div>
        </div>
      </div>

      <ProductsTable />
    </m.div>
  );
};

export default DashboardProducts;
