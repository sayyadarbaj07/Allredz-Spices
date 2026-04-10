const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: { weight: String, price: Number }, // Product size selected
        qty: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    shippingAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    paymentMethod: { type: String, enum: ["COD", "RAZORPAY"], default: "COD" },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    // 💳 Razorpay integration fields
    razorpayOrderId: { type: String }, // Razorpay order id
    razorpayPaymentId: { type: String }, // Payment id after successful payment
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
