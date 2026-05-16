import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { useAddProductMutation } from "../../redux/Api/productApi";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { X, Upload, Package, Info, Tag, IndianRupee, Sparkles, ChevronLeft } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const { fadeUp, scaleIn } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    weight: "",
    price: "",
    category: "Premium Blends",
    image: null,
    stock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload a product visual.");
    
    setLoading(true);
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("category", formData.category);
    productData.append("stock", formData.stock);
    productData.append("sizes", JSON.stringify([{ weight: formData.weight, price: Number(formData.price) }]));
    productData.append("image", formData.image);

    try {
      await addProduct(productData).unwrap();
      navigate("/dashboardlayout/products");
    } catch (err) {
      console.error(err);
      alert("Failed to curate the new spice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <m.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboardlayout/products")}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-red transition-all mb-10"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to Vault
        </m.button>

        <m.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="luxury-card bg-white p-10 md:p-16 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red via-yellow-400 to-brand-red" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">New Curation</span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-gray-900 tracking-tight">
                Add <span className="italic text-brand-red glow-text">Exquisite</span> Spice
              </h1>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red animate-pulse">
               <Sparkles size={32} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Image Upload */}
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Product Visual</label>
                <div className="relative aspect-square rounded-[3rem] border-4 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center overflow-hidden group/upload hover:border-brand-red/30 transition-all cursor-pointer">
                   <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    required
                  />
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-contain p-8 group-hover/upload:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-gray-300 group-hover/upload:text-brand-red transition-colors">
                       <Upload size={48} strokeWidth={1.5} />
                       <span className="text-xs font-black uppercase tracking-widest">Drop Image Here</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2 flex items-center gap-2">
                    <Package size={12} /> Identity
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Royal Kashmiri Saffron"
                    className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-brand-red/20 transition-all outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2 flex items-center gap-2">
                    <Info size={12} /> Aromatic Story
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the sensory journey..."
                    className="w-full bg-gray-50 border-none rounded-3xl p-6 text-sm font-bold focus:ring-2 focus:ring-brand-red/20 transition-all outline-none resize-none h-40"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-50">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2 flex items-center gap-2">
                  <Tag size={12} /> Category
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-brand-red/20 transition-all outline-none appearance-none"
                >
                   <option>Premium Blends</option>
                   <option>Heritage Spices</option>
                   <option>Authentic Masalas</option>
                   <option>Curated Collections</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2 flex items-center gap-2">
                  <Package size={12} /> Net Weight
                </label>
                <input
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="E.g. 100g"
                  className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-brand-red/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2 flex items-center gap-2">
                  <IndianRupee size={12} /> Investment
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-brand-red/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2 flex items-center gap-2">
                  <Package size={12} /> Inventory Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold focus:ring-2 focus:ring-brand-red/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="pt-10">
              <button
                type="submit"
                disabled={loading}
                className="premium-button w-full bg-brand-red text-white py-6 shadow-2xl hover:bg-gray-900 group h-20"
              >
                {loading ? (
                   <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="flex items-center gap-3">
                    Curate Spice <Sparkles size={18} className="group-hover:scale-125 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </m.div>
      </div>
    </div>
  );
};

export default AddProduct;
