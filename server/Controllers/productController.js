const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// Get all products
exports.getallProduct = async (req, res) => {
  try {
    const result = await Product.find();
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    // Return full image URLs so frontend doesn't need to construct them
    const products = result.map((p) => {
      const obj = p.toObject();
      if (obj.image) {
        // Already a full URL (from old Render data) — keep it
        if (obj.image.startsWith("http")) {
          return obj;
        }
        // Normalize backslashes and prepend base URL
        obj.image = `${BASE_URL}/${obj.image.replace(/\\/g, "/")}`;
      }
      return obj;
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      result: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Add product (with image upload)
exports.addProduct = async (req, res) => {
  try {
    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const { name, description, category, sizes } = req.body;

    const product = new Product({
      name,
      description,
      category,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: req.file.path.replace(/\\/g, "/"),
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      result: savedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// Update product (with optional image upload)
exports.updateProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const updateData = { ...req.body };

    // Optional image
    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    // Parse sizes if present
    if (updateData.sizes) {
      updateData.sizes = JSON.parse(updateData.sizes);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productid,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productid);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result: deletedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
