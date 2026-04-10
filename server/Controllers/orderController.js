import Order from "../models/Order.js";
import Product from "../models/Product.js"; // For stock info
import Razorpay from "razorpay";

// ---------------------------
// Razorpay Instance
// ---------------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ---------------------------
// Helper: Validate Address
// ---------------------------
const validateAddress = (address) => {
  const required = ["fullName", "phone", "pincode", "address", "city", "state"];
  return required.every(
    (field) => address[field] && address[field].trim() !== ""
  );
};

// ---------------------------
// Create COD Order
// ---------------------------
export const createCODOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    if (!validateAddress(shippingAddress)) {
      return res
        .status(400)
        .json({ message: "All address fields are required" });
    }

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

    // Reduce stock for each product
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    res.status(201).json({ message: "COD order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// Create Online Order
// ---------------------------
export const createOnlineOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    if (!validateAddress(shippingAddress)) {
      return res
        .status(400)
        .json({ message: "All address fields are required" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      payment_capture: 1,
    });

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

    // Reduce stock for each product
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    res.status(201).json({
      message: "Online order created successfully",
      order,
      razorpayOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.error?.description || err.message });
  }
};

// ---------------------------
// Verify Online Payment
// ---------------------------
export const verifyOnlinePayment = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "paid";
    order.status = "paid";
    order.razorpayPaymentId = paymentId;

    await order.save();
    res.status(200).json({ message: "Payment verified successfully", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Payment verification failed", error: err.message });
  }
};

// ---------------------------
// Get My Orders
// ---------------------------
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// Admin — Get All Orders
// ---------------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// Admin — Update Order Status
// ---------------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "delivered") order.paymentStatus = "paid";

    await order.save();
    res.json({ message: "Order updated successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// Admin — Get Order Stats
// ---------------------------
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ paymentStatus: "paid" });
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const codOrders = await Order.countDocuments({ paymentMethod: "COD" });
    const onlineOrders = await Order.countDocuments({
      paymentMethod: "ONLINE",
    });

    // Total Revenue
    const revenueAgg = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    // Total Customers
    const totalCustomers = await Order.distinct("user"); // unique user IDs

    // Total Products Sold
    const productsSoldAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", totalSold: { $sum: "$items.qty" } } },
    ]);
    const totalProductsSold = productsSoldAgg.reduce(
      (acc, item) => acc + item.totalSold,
      0
    );

    // Total Products in Stock
    const productsInStock = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);
    const totalStock = productsInStock[0]?.totalStock || 0;

    res.json({
      totalOrders,
      paidOrders,
      pendingOrders,
      codOrders,
      onlineOrders,
      totalRevenue,
      totalCustomers: totalCustomers.length,
      totalProductsSold,
      totalStock,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch stats", error: err.message });
  }
};
