import { Cart } from '../models/order.model.js';

export const addToCart = async (req, res) => {
  try {
    const { testOrPackageId, type, name, price, labId, quantity = 1 } = req.body;
    const userId = req.user.id;

    // Find existing item
    const existing = await Cart.findOne({ userId, testOrPackageId });
    
    if (existing) {
      // Update quantity if item exists
      existing.quantity += quantity;
      await existing.save();
      return res.status(200).json({ 
        success: true, 
        itemId: existing._id, 
        cartItem: existing,
        message: "Item quantity updated in cart"
      });
    }

    // Create new cart item if it doesn't exist
    const newCartItem = new Cart({
      userId,
      labId,
      testOrPackageId,
      type,
      name,
      price,
      quantity
    });

    await newCartItem.save();
    res.status(201).json({ 
      success: true, 
      itemId: newCartItem._id, 
      cartItem: newCartItem,
      message: "Item added to cart"
    });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: error.message 
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id });
    res.status(200).json({ success: true, message: "Cart items fetched successfully", cartItems });
  } catch (error) {
    console.error("Fetch cart error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }
    res.status(200).json({ success: true, message: "Cart item fetched successfully", cartItem });
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
    res.status(200).json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Remove cart item error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });
    res.status(200).json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Clear cart error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;


    if (!quantity || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: "Quantity must be a number greater than 0" 
      });
    }

  
    const updatedItem = await Cart.findOneAndUpdate(
      { _id: id, userId }, 
      { quantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart item not found or doesn't belong to user" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      updatedItem
    });

  } catch (error) {
    console.error("Update cart item error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
};