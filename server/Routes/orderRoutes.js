const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken, isAdmin } = require("../middleware/auth");
require("dotenv").config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Validate address
const validateAddress = (address) => {
  const required = ["fullName", "phone", "pincode", "address", "city", "state"];
  return required.every(
    (field) => address[field] && address[field].trim() !== ""
  );
};

// ----------------- CREATE COD ORDER -----------------
router.post("/create-cod", verifyToken, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    if (!validateAddress(shippingAddress))
      return res
        .status(400)
        .json({ message: "All address fields are required" });

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: "COD",
      paymentStatus: "unpaid",
      status: "pending",
    });

    await order.save();

    // Reduce product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    res.status(201).json({ message: "COD Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "COD order failed", error: err.message });
  }
});

// ----------------- CREATE ONLINE ORDER -----------------
router.post("/create-online", verifyToken, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    if (!validateAddress(shippingAddress))
      return res
        .status(400)
        .json({ message: "All address fields are required" });

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: "ONLINE",
      paymentStatus: "unpaid",
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    await order.save();

    // Reduce stock for ordered products
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    res
      .status(201)
      .json({ message: "Online order created", order, razorpayOrder });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Online order creation failed", error: err.message });
  }
});

// ----------------- COMPLETE PAYMENT (with signature verification) -----------------
router.post("/complete-payment", verifyToken, async (req, res) => {
  try {
    const { orderId, paymentId, razorpayOrderId, razorpaySignature } = req.body;

    // Verify Razorpay payment signature (prevents fake payment confirmations)
    if (!razorpayOrderId || !razorpaySignature) {
      return res.status(400).json({ message: "Missing payment verification fields" });
    }
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Payment verification failed: invalid signature" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "paid";
    order.status = "paid";
    order.razorpayPaymentId = paymentId;
    await order.save();

    res.json({ message: "Payment verified", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Payment verification failed", error: err.message });
  }
});

// ----------------- GET MY ORDERS -----------------
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------- ADMIN — ALL ORDERS -----------------
router.get("/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------- ADMIN — UPDATE ORDER STATUS -----------------
router.put("/update/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "delivered") order.paymentStatus = "paid";

    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------- ADMIN — DASHBOARD STATS -----------------
router.get("/stats", verifyToken, isAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ paymentStatus: "paid" });
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const codOrders = await Order.countDocuments({ paymentMethod: "COD" });
    const onlineOrders = await Order.countDocuments({
      paymentMethod: "ONLINE",
    });

    const revenueAgg = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    const totalCustomers = await Order.distinct("user");

    const productAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", totalSold: { $sum: "$items.qty" } } },
    ]);

    const productsInStock = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);

    res.json({
      totalOrders,
      totalCustomers: totalCustomers.length,
      totalRevenue,
      paidOrders,
      pendingOrders,
      codOrders,
      onlineOrders,
      totalProductsSold: productAgg.reduce(
        (acc, item) => acc + item.totalSold,
        0
      ),
      totalStock: productsInStock[0]?.totalStock || 0,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch stats", error: err.message });
  }
});

module.exports = router;
