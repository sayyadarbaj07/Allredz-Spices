const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  weight: { type: String, required: true }, // "50gm", "100gm"
  price: { type: Number, required: true }, // 50, 90
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true },
    category: { type: String, default: "Spices" },
    sizes: [sizeSchema], // array of weight/price objects
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
