import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // temporary product data (later dynamic via RTK Query)
  const product = {
    id: id,
    name: "Biryani Masala",
    image:
      "https://images.unsplash.com/photo-1615486364391-2875b7e5f186?w=800&q=80",
    description:
      "Our premium Biryani Masala gives your biryani an authentic, aromatic, and flavorful taste.",
    price: 120,
    sizes: ["50 gm", "100 gm"],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>

            <p className="text-lg font-semibold text-gray-800 mb-2">
              Price: ₹{product.price}
            </p>

            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-3">Size:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none">
                {product.sizes.map((size, index) => (
                  <option key={index}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate("/cart")}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/products")}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
