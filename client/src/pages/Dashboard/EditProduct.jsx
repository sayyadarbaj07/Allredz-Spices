import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../redux/Api/productAPi";
import hero from "../../assets/hero.jpg";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Fetch all products
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  // ✅ Form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    weight: "",
    price: "",
    category: "", // Optional category
    imageFile: null,
    imagePreview: hero,
  });

  // ✅ Prefill form
  useEffect(() => {
    if (productsData) {
      const product = productsData.result.find((p) => p._id === id);
      if (product) {
        setForm({
          name: product.name || "",
          description: product.description || "",
          weight: product.sizes?.[0]?.weight || "",
          price: product.sizes?.[0]?.price || "",
          category: product.category || "", // Optional
          imageFile: null,
          imagePreview: product.image?.startsWith("/uploads/")
            ? `${import.meta.env.VITE_API_URL || ""}${product.image}`
            : product.image || hero,
        });
      }
    }
  }, [productsData, id]);

  // ✅ Input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ File change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setForm({
        ...form,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append(
      "sizes",
      JSON.stringify([{ weight: form.weight, price: Number(form.price) }])
    );
    if (form.category) formData.append("category", form.category); // optional
    if (form.imageFile) formData.append("image", form.imageFile); // optional

    try {
      await updateProduct({ id, updatedData: formData }).unwrap();
      alert("✅ Product updated successfully!");
      refetch();
      navigate("/dashboardlayout/products");
    } catch (err) {
      console.error("❌ Failed to update product:", err);
      alert(`❌ Failed to update product! ${err?.data?.message || ""}`);
    }
  };

  // ✅ Loading & error
  if (isLoading) return <p className="text-center py-20 text-xl">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-20 text-red-600">Error loading product!</p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5e6d3] relative px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
          Edit Product
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Weight</label>
          <input
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Category (optional) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Category (optional)
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Image (optional) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <img
            src={form.imagePreview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={updating}
          className="bg-red-700 hover:bg-red-800 text-white w-full py-2 rounded"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
