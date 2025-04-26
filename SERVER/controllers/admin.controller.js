import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.util.js";
import Lab from "../models/lab.model.js";
import {Order} from "../models/order.model.js";
import { Test, Package} from "../models/testpackage.model.js";
import mongoose from "mongoose";



// Super admin controller functions
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
    httpOnly:true,
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


export const createUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Only Super Admin can create users." });
    }

    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      createdUser: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;

    // Prevent Super Admin from deleting themselves 
    if (req.user._id.toString() === id) {
      return res.status(403).json({ message: "You cannot delete your own account." });
    }
    

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If labadmin: unlink from lab
    if (user.role === "labadmin" && user.labId) {
      await Lab.findByIdAndUpdate(user.labId, { labAdmin: null });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;

    if (password && password.trim() !== "") {
      user.password = password;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("firstName lastName email _id role createdAt labId");
    res.status(200).json({ users: allUsers });
    
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Users", error: error.message });
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



// Lab admin controller functions
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
