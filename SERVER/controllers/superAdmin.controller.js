import User from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.util.js";
import Lab from "../models/lab.model.js";
import Order from "../models/order.model.js";
import TestPackage from "../models/package.model.js";

export const createSuperAdmin = async (req, res) => {
  try {
    const superAdminExists = await User.findOne({ role: "Super Admin" });

    if (superAdminExists) {
      return res.status(403).json({ message: "Super Admin already exists. Access denied." });
    }

    const { email, password, firstName, lastName } = req.body;

    const superAdmin = await User.create({
      firstName,
      lastName,
      email,
      password, 
      role: "Super Admin",
    });

    res.status(201).json({
      success: true,
      message: "Super Admin created successfully",
      superAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Super Admin", error: error.message });
  }
};

export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({ message:"Email and password are required." })
    }
    // Check if the user exists
    const user = await User.findOne({ email, role: "Super Admin" });
    if (!user) {
      return res.status(404).json({ message: "Super Admin not found" });
    }
   const auth = await bcrypt.compare(password, user.password)

   if(!auth){
      return res.json({
        message:"Incorrect password and email"
      })
   }
   const token = generateToken(user._id, user.email);
   res.cookie("token", token, {
    withCredentials:true,
    httpOnly:false,
   });
   res.status(200).json({
    message:"Super admin login Successfully",
    success:true,
    token,
   });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
export const logoutSuperAdmin = (req, res) => {
  try {
    // Clear the authentication token stored in cookies
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};

export const superAdminOverview = async (req, res) => {
  try {
    // Fetch total counts
    const totalUsers = await User.countDocuments();
    const totalLabs = await Lab.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Fetch top 5 labs with the most orders
    const labsWithMostOrders = await Order.aggregate([
      { $group: { _id: "$labId", totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "labs",
          localField: "_id",
          foreignField: "_id",
          as: "labDetails",
        },
      },
      { $unwind: "$labDetails" },
      { $project: { _id: 0, name: "$labDetails.name", Orders: "$totalOrders" } },
    ]);

    // Fetch most used/booked tests
    const mostUsedTests = await Order.aggregate([
      { $unwind: "$tests" }, // Decomposing array of tests
      { $group: { _id: "$tests.testName", value: { $sum: 1 } } },
      { $sort: { value: -1 } },
      { $limit: 5 },
      { $project: { name: "$_id", value: 1, _id: 0 } },
    ]);

    // Order status breakdown
    const orderStatus = await Order.aggregate([
      { $group: { _id: "$status", value: { $sum: 1 } } },
      { $project: { name: "$_id", value: 1, _id: 0 } },
    ]);

    res.status(200).json({
      totalUsers,
      totalLabs,
      totalOrders,
      labsWithMostOrders,
      mostUsedTests,
      orderStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching overview data", error: error.message });
  }
};

export const createLabAdmin = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "Super Admin") {
      return res.status(403).json({ message: "Access denied. Only Super Admin can create Lab Admins." });
    }

    const { firstName, lastName, email, password, labId } = req.body;

    if (!firstName || !lastName || !email || !password || !labId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const lab = await Lab.findById(labId);
    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    const labAdmin = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: "Lab Admin",
      labId: labId, 
    });

    // Update Lab to assign the Lab Admin
    await Lab.findByIdAndUpdate(labId, { createdBy: labAdmin._id });
    

    res.status(201).json({
      success: true,
      message: "Lab Admin created and assigned to lab successfully",
      labAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Lab Admin", error: error.message });
  }
};

export const getInbox = async (req, res) => {
  try {
    const inboxMessages = await Inbox.find().sort({ createdAt: -1 });
    res.status(200).json(inboxMessages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inbox messages", error: error.message });
  }
};
export const respondToInbox = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const updatedInbox = await Inbox.findByIdAndUpdate(
      id,
      { response, status: "Responded" },
      { new: true }
    );

    res.status(200).json({ message: "Inbox message responded successfully", inbox: updatedInbox });
  } catch (error) {
    res.status(500).json({ message: "Error responding to inbox message", error: error.message });
  }
};
export const getSettings = async (req, res) => {
  try {
    const superAdmin = await User.findById(req.user.id).select("-password"); 
    if (!superAdmin) return res.status(404).json({ message: "Super Admin not found" });

    res.status(200).json(superAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};
export const updateSettings = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email },
      { new: true }
    ).select("-password"); 

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error: error.message });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const superAdmin = await User.findById(req.user.id);

    if (!superAdmin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered current password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(currentPassword.trim(), superAdmin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save the new password
    superAdmin.password = hashedPassword;
    await superAdmin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
};


