// ✅ controllers/order.controller.js
import { Order, Cart } from '../models/order.model.js';
import {Test, Package} from "../models/testpackage.model.js"
export const createOrder = async (req, res) => {
  try {
    const {
      name, email, phoneNumber, gender, age,
      address, state, country,
      collectionMethod, bookingDate, bookingTime,
      paymentStatus
    } = req.body;

    const deliveryCharge = collectionMethod === "Home Collection" ? 100 : 0;

    const cartItems = await Cart.find({ userId: req.user.id });
    if (!cartItems.length)
      return res.status(400).json({ message: "Cart is empty" });

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    const items = cartItems.map((item) => ({
      testOrPackageId: item.testOrPackageId,
      name: item.name,
      price: item.price,
      type: item.type,
      labId: item.labId
    }));

    const newOrder = await Order.create({
      userId: req.user.id,
      items,
      name,
      email,
      phoneNumber,
      gender,
      age,
      address,
      state,
      country,
      collectionMethod,
      bookingDetails: {
        date: bookingDate,
        time: bookingTime
      },
      subtotal,
      deliveryCharge,
      paymentStatus: paymentStatus || "pending",
      status: "Pending"
    });

    for (const item of items) {
      if (item.type === "Test") {
        await Test.findByIdAndUpdate(item.testOrPackageId, { $inc: { bookedCount: 1 } });
      } else if (item.type === "Package") {
        await Package.findByIdAndUpdate(item.testOrPackageId, { $inc: { bookedCount: 1 } });
      }
    }
    await Cart.deleteMany({ userId: req.user.id });
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.labId", "name");
    res.status(200).json({ message: "Orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json({ order });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch order" });
//   }
// };

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.labId", "name")  
      .populate("userId", "firstName lastName email");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "All orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLabOrders = async (req, res) => {
  try {
    const labId = req.user.labId;
    // const orders = await Order.find({ "items.labId": labId });
    const orders = await Order.find({ "items.labId": labId }).sort({ updatedAt: -1 });

    res.status(200).json({ message: "Orders for this lab", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    // Ensure form-data fields are strings
    const status = req.body.status?.toString();
    const paymentStatus = req.body.paymentStatus?.toString();
    const completionDate = req.body.completionDate;

    const validStatuses = ["Pending", "Approved", "Completed", "Cancelled","Progress"];
    const validPayments = ["pending", "paid", "unpaid"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    if (!validPayments.includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const updateFields = {
      status,
      paymentStatus,
    };

    if (completionDate) {
      updateFields.completionDate = completionDate;
    }

    if (req.file && req.file.path) {
      const downloadableUrl = req.file.path.replace("/upload/", "/upload/fl_attachment/");
      updateFields.reportFile = downloadableUrl;
    }
    // console.log("Report file URL:", downloadableUrl);
    
    
    

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
