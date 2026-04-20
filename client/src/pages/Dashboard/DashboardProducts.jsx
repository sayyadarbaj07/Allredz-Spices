import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/Api/productAPi";
import hero from "../../assets/masala.png";

const DashboardProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold py-10">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 font-semibold py-10">
        Failed to fetch products ❌
      </p>
    );

  const products = data?.result || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        alert("✅ Product deleted successfully!");
        // No need to refetch manually, RTK Query invalidatesTags will update table
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete product!");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        All Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found!</p>
      ) : (
        <motion.table
          className="min-w-full border-collapse border border-gray-300 table-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Product Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Size
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              const imgSrc = p.image?.startsWith("/uploads/")
                ? `${import.meta.env.VITE_API_URL || ""}${p.image}`
                : p.image || hero;

              return (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <img
                      src={imgSrc}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {p.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 max-w-xs sm:max-w-md truncate">
                    {p.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {p.sizes?.[0]?.weight || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ₹{p.sizes?.[0]?.price || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() =>
                        navigate(`/dashboardlayout/products/edit/${p._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      onClick={() => handleDelete(p._id)}
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </motion.table>
      )}
    </div>
  );
};

export default DashboardProducts;
