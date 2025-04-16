
import User from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.util.js";
import Test from "../models/test.model.js";
import Package from "../models/package.model.js";
import Order from "../models/order.model.js";
import Lab from "../models/lab.model.js";
import mongoose from "mongoose";

// ====== LAB ADMIN AUTH ======
  export const loginLabAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const labAdmin = await User.findOne({ email, role: "Lab Admin" });
      if (!labAdmin) {
        return res.status(404).json({ message: "Lab Admin not found" });
      }
  
       if (password) {
               const salt = await bcrypt.genSalt(10);
               labAdmin.password = await bcrypt.hash(password, salt);
             }
             
             const isPasswordCorrect = await bcrypt.compare(password.trim(), labAdmin.password);
             // console.log(" Password :",isPasswordCorrect);
             if (!isPasswordCorrect) {
               return res.status(401).json({ message: "Invalid email or password" });
             }

      // Generate a JWT token
      const token = generateToken(labAdmin); 

  
      res.status(200).json({
        success: true,
        message: "Login successful",
        labAdmin: {
          id: labAdmin._id,
          email: labAdmin.email,
          firstName: labAdmin.firstName,
          lastName: labAdmin.lastName,
          role: labAdmin.role,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging in Lab Admin", error: error.message });
    }
  };
  export const logoutLabAdmin = (req, res) => {
    try {
      res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging out Lab Admin", error: error.message });
    }
  };
  

// ====== LAB ADMIN ======
export const getLabAdminOverview = async (req, res) => {
    try {
      const labAdminId = req.user.id; 
  
      console.log("Lab Admin ID:", labAdminId);
  
      const totalOrders = await Order.countDocuments({ labAdmin: labAdminId });
  
      const pendingOrders = await Order.countDocuments({ labAdmin: labAdminId, status: "pending" });
      const completedOrders = await Order.countDocuments({ labAdmin: labAdminId, status: "completed" });
  
      const totalTests = await Test.countDocuments({ 
        $or: [{ labAdmin: labAdminId }, { createdBy: labAdminId }] 
      });
  
      const totalPackages = await Package.countDocuments({ 
        $or: [{ labAdmin: labAdminId }, { createdBy: labAdminId }] 
      });
  
      const completionRate = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0;
  
      const ordersOverTime = await Order.aggregate([
        {
          $match: { labAdmin: new mongoose.Types.ObjectId(labAdminId) }
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            orders: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedOrdersOverTime = ordersOverTime.map(order => ({
        name: months[order._id - 1], 
        orders: order.orders
      }));
  
      res.status(200).json({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalTests,  
        totalPackages, 
        completionRate,
        ordersOverTime: formattedOrdersOverTime
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const getLabAdminProfile = async (req, res) => {
  try {
    const labAdminId = req.user.id;
    const labAdmin = await User.findById(labAdminId).select("-password"); 

    if (!labAdmin) {
      return res.status(404).json({ message: "Lab Admin not found" });
    }

    res.status(200).json({ success: true, labAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Lab Admin", error: error.message });
  }
};
export const updateLabAdminProfile = async (req, res) => {
  try {
    const labAdminId = req.user.id;
    let updates = { ...req.body };

    if (updates.password) {
      return res.status(400).json({ message: "Password update is not allowed here." });
    }

    const updatedLabAdmin = await User.findByIdAndUpdate(labAdminId, updates, { new: true }).select("-password");

    if (!updatedLabAdmin) {
      return res.status(404).json({ message: "Lab Admin not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated", labAdmin: updatedLabAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
export const updateLabDetails = async (req, res) => {
  try {
    const labAdminId = req.user.id;

    const updatedLab = await Lab.findOneAndUpdate({ labAdmin: labAdminId }, req.body, { new: true });

    if (!updatedLab) {
      return res.status(404).json({ message: "Lab not found for this Lab Admin" });
    }

    res.status(200).json({ success: true, message: "Lab details updated", lab: updatedLab });
  } catch (error) {
    res.status(500).json({ message: "Error updating lab details", error: error.message });
  }
};
export const getInboxMessages = async (req, res) => {
  try {
    const inboxMessages = await Inbox.find({ labAdmin: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, inboxMessages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};
export const respondToInboxMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const updatedInbox = await Inbox.findByIdAndUpdate(
      id,
      { response, status: "Responded", respondedAt: new Date() },
      { new: true }
    );

    if (!updatedInbox) {
      return res.status(404).json({ message: "Inbox message not found" });
    }

    res.status(200).json({ success: true, message: "Message responded successfully", inbox: updatedInbox });
  } catch (error) {
    res.status(500).json({ message: "Error responding to message", error: error.message });
  }
};
