import {Order, Cart} from '../models/order.model.js';
import User from '../models/user.model.js';

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




// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { testOrPackageId, type, name, price } = req.body;
    const userId = req.user.id;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Optional: Prevent duplicates (uncomment if needed)
    const existing = await Cart.findOne({ userId, testOrPackageId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Item already in cart" });
    }

    const newCartItem = new Cart({
      userId,
      testOrPackageId,
      type,
      name,
      price,
    });

    await newCartItem.save();

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Get all items for logged-in user
export const getUserCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id });

    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      cartItems,
    });
  } catch (error) {
    console.error("Fetch cart error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Get single cart item by ID
export const getCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart item fetched successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Get cart item error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error("Remove cart item error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


