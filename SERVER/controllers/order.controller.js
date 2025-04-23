import Order from '../models/order.model.js';
import Cart from "../models/cart.model.js";


export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided for order" });
    }

    const order = new Order({
      userId: req.user.id,
      items: items.map(item => ({
        testOrPackageId: item.testOrPackageId,
        type: item.type,
        name: item.name,
        price: item.price,
      })),
      totalPrice: items.reduce((sum, item) => sum + item.price, 0),
    });

    await order.save();

    await Cart.deleteMany({ userId: req.user.id });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ message: "Orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Approved", "Completed", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Status updated", order });
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

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "All orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
