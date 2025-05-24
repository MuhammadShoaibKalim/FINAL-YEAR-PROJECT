
import { Order, Cart } from '../models/order.model.js';
import {Test, Package} from "../models/testpackage.model.js"
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

function getOrderKey(order) {
  const userId = order.userId.toString();
  const bookingDate = new Date(order.bookingDetails.date).toISOString().slice(0, 10); // YYYY-MM-DD
  const itemsIds = order.items
    .map(i => i.testOrPackageId.toString())
    .sort()
    .join(',');
  return `${userId}-${bookingDate}-${itemsIds}`;
}

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

// export const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user.id }).populate("items.labId", "name");
//     res.status(200).json({ message: "Orders fetched", orders });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.labId", "name").lean();

    const uniqueOrdersMap = new Map();
    orders.forEach(order => {
      const key = getOrderKey(order);
      if (!uniqueOrdersMap.has(key)) {
        uniqueOrdersMap.set(key, order);
      }
    });

    const uniqueOrders = Array.from(uniqueOrdersMap.values());

    res.status(200).json({ message: "Orders fetched", orders: uniqueOrders });
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

// export const getLabOrders = async (req, res) => {
//   try {
//     const labId = req.user.labId;
//     const orders = await Order.find({ "items.labId": labId })
//       .populate("userId", "firstName lastName email")
//       .populate("items.labId", "name")
//       .sort({ updatedAt: -1 });

//     res.status(200).json({ message: "Orders for this lab", orders });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getLabOrders = async (req, res) => {
  try {
    const labId = req.user.labId;

    const allOrders = await Order.find({ "items.labId": labId })
      .populate("userId", "firstName lastName email")
      .populate("items.labId", "name")
      .sort({ updatedAt: -1 })
      .lean();

    const uniqueOrdersMap = new Map();
    allOrders.forEach(order => {
      const key = getOrderKey(order);
      if (!uniqueOrdersMap.has(key)) {
        uniqueOrdersMap.set(key, order);
      }
    });

    const uniqueOrders = Array.from(uniqueOrdersMap.values());

    // Filter items to only lab's items
    const filteredOrders = uniqueOrders
      .map(order => {
        const labItems = order.items.filter(item => item.labId && item.labId._id.toString() === labId.toString());
        return { ...order, items: labItems };
      });

    res.status(200).json({ message: "Orders for this lab", orders: filteredOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const updateOrderStatus = async (req, res) => {
  try {
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

export const updateLabOrderStatus = async (req, res) => {
  try {
    const { orderId, labId } = req.params;
    const { status, paymentStatus, reportFile } = req.body;

    if (req.user.role !== 'labadmin' || req.user.labId.toString() !== labId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this lab's orders"
      });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Update status for items belonging to this lab
    let updated = false;
    order.items = order.items.map(item => {
      if (item.labId && item.labId.toString() === labId) {
        updated = true;
        return {
          ...item.toObject(),
          status: status,
          reportFile: reportFile || item.reportFile
        };
      }
      return item;
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "No items found for this lab in the order"
      });
    }

    // Update main order status based on all items' statuses
    const allItemsCompleted = order.items.every(item => item.status === "Completed");
    const allItemsCancelled = order.items.every(item => item.status === "Cancelled");
    const someItemsInProgress = order.items.some(item => item.status === "In Progress");

    if (allItemsCompleted) {
      order.status = "Completed";
    } else if (allItemsCancelled) {
      order.status = "Cancelled";
    } else if (someItemsInProgress) {
      order.status = "In Progress";
    } else {
      order.status = "Pending";
    }

    // Update payment status if provided
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    // Update report file if provided
    if (reportFile) {
      order.reportFile = reportFile;
    }

    await order.save();

    // Populate the lab information before sending response
    await order.populate("items.labId", "name");

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order
    });

  } catch (error) {
    console.error("Error updating lab order status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message
    });
  }
};

export const cancelLabOrder = async (req, res) => {
  try {
    const { orderId, labId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Only allow cancellation if user owns the order or is the lab admin
    if (order.userId.toString() !== req.user.id && 
        (req.user.role !== 'labadmin' || req.user.labId.toString() !== labId)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this order"
      });
    }

    // Update status only for items belonging to this lab
    order.items = order.items.map(item => {
      if (item.labId.toString() === labId && item.status === "Pending") {
        return { ...item.toObject(), status: "Cancelled" };
      }
      return item;
    });

    // Check if all items are cancelled to update main order status
    if (order.items.every(item => item.status === "Cancelled")) {
      order.status = "Cancelled";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Lab order cancelled successfully",
      order
    });

  } catch (error) {
    console.error("Error cancelling lab order:", error);
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message
    });
  }
};

export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const orderId = req.params.id;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "default_folder",
      resource_type: "raw",
      public_id: req.file.originalname.split(".")[0]
    });

    const downloadableUrl = result.secure_url.replace("/upload/", "/upload/fl_attachment/");

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.reportFile = downloadableUrl;
    await order.save();

    fs.unlinkSync(req.file.path); 

    res.status(200).json({ message: "Report uploaded", reportFile: downloadableUrl });
  } catch (error) {
    console.error("Manual report upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

