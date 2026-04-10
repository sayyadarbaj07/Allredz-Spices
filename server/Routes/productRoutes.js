const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  getallProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all products (public)
router.get("/", getallProduct);

// Add product (Admin only) with image upload & validation
router.post(
  "/add-product",
  verifyToken,
  isAdmin,
  upload.single("image"),
  addProduct
);

// Update product (Admin only) with optional image upload
router.put(
  "/update-product/:productid",
  verifyToken,
  isAdmin,
  upload.single("image"), // optional image
  updateProduct
);

// Delete product (Admin only)
router.delete(
  "/delete-product/:productid",
  verifyToken,
  isAdmin,
  deleteProduct
);

module.exports = router;
