import Cart from '../models/cart.model.js';
import User from '../models/auth.model.js';  

export const addToCart = async (req, res) => {
    try {
        const { testOrPackageId, type, name, price } = req.body;
        const userId = req.user.id; 

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const newCartItem = new Cart({
            userId,
            testOrPackageId,
            type,
            name,
            price,
        });

        await newCartItem.save();
        res.status(201).json({ message: "Item added to cart", cartItem: newCartItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.find({ userId });

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "No items found in cart" });
        }

        res.json({ message: "Cart items fetched successfully", cartItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({
            message: "Cart item fetched successfully",
            cartItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await Cart.deleteMany({ userId });

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
