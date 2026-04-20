import React from "react";
import { useGetAllProductsQuery } from "../redux/Api/productAPi";
const ProductList = () => {
  // RTK Query hook — backend se data fetch karega
  const { data, error, isLoading } = useGetAllProductsQuery();

  // Loading state
  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading products...</p>;
  }

  // Error state
  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error fetching products ❌
      </p>
    );
  }

  // Data mil gaya
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        All Products
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data?.products?.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                product.image?.startsWith("/uploads/")
                  ? `${import.meta.env.VITE_API_URL || ""}${product.image}`
                  : product.image || "/images/default.jpg"
              }
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <p className="font-bold text-green-600 mt-2">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
