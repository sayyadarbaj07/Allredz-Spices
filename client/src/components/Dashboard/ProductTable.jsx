import React from "react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/Api/productApi";
import { useNavigate } from "react-router-dom";

const ProductsTable = () => {
  const navigate = useNavigate();

  const { data: products, isLoading, isError } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error deleting product");
      }
    }
  };

  if (isLoading) return <p className="text-gray-600">Loading products...</p>;
  if (isError) return <p className="text-red-500">Error fetching products!</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-[#D32F2F] text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Sizes</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50 transition">
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">{product.category}</td>
              <td className="py-3 px-4">
                {product.sizes.map((s, i) => (
                  <span key={i} className="block">
                    {s.weight} - ${s.price}
                  </span>
                ))}
              </td>
              <td className="py-3 px-4">
                {product.inStock ? (
                  <span className="text-green-600 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                )}
              </td>
              <td className="py-3 px-4 flex gap-2">
                {/* Edit Button */}
                <button
                  onClick={() =>
                    navigate(`/dashboard/products/add/${product._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
