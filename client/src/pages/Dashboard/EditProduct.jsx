import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { 
  useGetProductByIdQuery, 
  useUpdateProductMutation 
} from "../../redux/Api/productApi";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { X, Upload, Package, Info, Tag, IndianRupee, Sparkles, ChevronLeft, Save } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, isLoading: fetching } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const { fadeUp, scaleIn } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    weight: "",
    price: "",
    category: "",
    imageFile: null,
    imagePreview: null,
  });

  useEffect(() => {
    if (productData) {
      const product = productData;
      setFormData({
        name: product.name || "",
        description: product.description || "",
        weight: product.sizes?.[0]?.weight || "",
        price: product.sizes?.[0]?.price || "",
        category: product.category || "Premium Blends",
        imageFile: null,
        imagePreview: product.image?.startsWith("/uploads/")
          ? `${import.meta.env.VITE_API_URL || ""}${product.image}`
          : product.image,
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, imageFile: file, imagePreview: URL.createObjectURL(file) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("sizes", JSON.stringify([{ weight: formData.weight, price: Number(formData.price) }]));
    if (formData.imageFile) data.append("image", formData.imageFile);

    try {
      await updateProduct({ id, updatedData: data }).unwrap();
      navigate("/dashboardlayout/products");
    } catch (err) {
      console.error(err);
      alert("Failed to refine the aromatic profile.");
    }
  };

  if (fetching) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#faf9f6]">
      <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-6 relative overflow-hidden">
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">Master Batch Editing</span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-gray-900 tracking-tight">
                Refine <span className="italic text-brand-red glow-text">Aromatic</span> Profile
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
                  />
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-contain p-8 group-hover/upload:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-gray-300 group-hover/upload:text-brand-red transition-colors">
                       <Upload size={48} strokeWidth={1.5} />
                       <span className="text-xs font-black uppercase tracking-widest">Update Image</span>
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
                    placeholder="Spice Name"
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
                    placeholder="Sensory description..."
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
            </div>

            <div className="pt-10">
              <button
                type="submit"
                disabled={updating}
                className="premium-button w-full bg-gray-900 text-white py-6 shadow-2xl hover:bg-brand-red group h-20 transition-all duration-500"
              >
                {updating ? (
                   <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="flex items-center gap-3 uppercase tracking-[0.2em] font-black">
                    Update Master Batch <Save size={18} className="group-hover:scale-125 transition-transform" />
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

export default EditProduct;
