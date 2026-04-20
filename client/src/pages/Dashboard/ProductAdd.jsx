// import React, { useState } from "react";
// import { useAddProductMutation } from "../../redux/Api/productAPi";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const [addProduct, { isLoading, isError, isSuccess }] =
//     useAddProductMutation();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     weight: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addProduct(formData).unwrap();
//       alert("✅ Product added successfully!");
//       navigate("/products");
//     } catch (error) {
//       console.error("❌ Error adding product:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f5e6d3]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
//       >
//         <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
//           Add New Product
//         </h2>

//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter product name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Price (₹)</label>
//           <input
//             type="number"
//             name="price"
//             placeholder="Enter price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Weight</label>
//           <input
//             type="text"
//             name="weight"
//             placeholder="50g / 100g"
//             value={formData.weight}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             placeholder="Enter image link"
//             value={formData.image}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-red-700 hover:bg-red-800 text-white font-bold w-full py-2 rounded"
//         >
//           {isLoading ? "Adding..." : "Add Product"}
//         </button>

//         {isError && (
//           <p className="text-red-600 text-center mt-3">Failed to add product</p>
//         )}
//         {isSuccess && (
//           <p className="text-green-600 text-center mt-3">
//             Product added successfully!
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    weight: "",
    price: "",
    image: null, // will hold the file
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // for image preview

  // Handle input changes
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name || formData.name.length < 3) {
      alert("Name must be at least 3 characters!");
      return;
    }
    if (!formData.description || formData.description.length < 10) {
      alert("Description must be at least 10 characters!");
      return;
    }
    if (!formData.weight) {
      alert("Please enter a weight (e.g. 100g)!");
      return;
    }
    if (!formData.price) {
      alert("Please enter a price!");
      return;
    }
    if (!formData.image) {
      alert("Please upload an image!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // FormData for file upload
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("category", "Spices");
      productData.append(
        "sizes",
        JSON.stringify([
          { weight: formData.weight, price: Number(formData.price) },
        ])
      );
      productData.append("image", formData.image);

      const BASE_URL = import.meta.env.VITE_API_URL || "";
      const res = await fetch(
        `${BASE_URL}/api/products/add-product`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // do NOT set Content-Type for FormData
          },
          body: productData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          weight: "",
          price: "",
          image: null,
        });
        setPreview(null);
        navigate("/dashboardlayout/products");
      } else {
        // Show validation errors from backend
        if (data.errors) {
          const errorMsg = data.errors.map((err) => err.msg).join("\n");
          alert(errorMsg);
        } else if (data.message) {
          alert(data.message);
        } else {
          alert("❌ Failed to add product!");
        }
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5e6d3] relative px-4">
      <button
        onClick={() => navigate("/dashboardlayout/products")}
        className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-red-700 transition"
      >
        ✖ Close
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
          Add New Product
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name (min 3 chars)"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description (min 10 chars)"
            className="w-full border px-3 py-2 rounded"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Weight</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="50g / 100g"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-700 hover:bg-red-800 text-white w-full py-2 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
