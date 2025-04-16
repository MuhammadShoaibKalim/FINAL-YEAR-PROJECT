import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, userId: req.user.id });
        await order.save();
        res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json({ 
            message: "User orders fetched successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);
        const { status } = req.body;

        if (!["Pending", "Approved", "Completed", "Cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        console.error("Update Order Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await Order.deleteOne({ _id: req.params.id }); 
        res.status(201).json({
            message:" Order deleted successfully",
        }) 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            message: "All orders fetched successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = 'Cancelled';
        await order.save();
        res.status(200).json({ 
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
