import Cart from '../models/cart.model.js';
import User from '../models/auth.model.js';

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
    // const existing = await Cart.findOne({ userId, testOrPackageId });
    // if (existing) {
    //   return res.status(400).json({ success: false, message: "Item already in cart" });
    // }

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
