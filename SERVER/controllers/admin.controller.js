import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.util.js";
import Lab from "../models/lab.model.js";
import {Order} from "../models/order.model.js";
import { Test, Package} from "../models/testpackage.model.js";
import mongoose from "mongoose";
import Query from "../models/query.model.js";
import { sendEmail } from "../utils/sendEmail.util.js";



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
    const totalUsers = await User.countDocuments();
    const totalLabs = await Lab.countDocuments();
    const totalOrders = await Order.countDocuments();

    // ✅ Total Revenue from completed and paid orders
    const revenueData = await Order.aggregate([
      { $match: { status: "Completed", paymentStatus: "paid" } },
      { $unwind: "$items" },
      { $group: { _id: null, total: { $sum: "$items.price" } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // ✅ Labs with Most Orders (from completed and paid)
    const labsWithMostOrders = await Order.aggregate([
      { $unwind: "$items" },
      { $match: { paymentStatus: "paid", status: "Completed" } },
      {
        $group: {
          _id: "$items.labId",
          totalOrders: { $sum: 1 },
          revenue: { $sum: "$items.price" }
        }
      },
      { $sort: { revenue: -1, totalOrders: -1 } },
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
      {
        $project: {
          _id: 0,
          name: "$labDetails.name",
          orders: "$totalOrders",
          revenue: 1
        },
      },
    ]);

    // ✅ Most Booked Tests
    const mostUsedTests = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", value: { $sum: 1 } } },
      { $sort: { value: -1 } },
      { $limit: 5 },
      { $project: { name: "$_id", value: 1, _id: 0 } },
    ]);

    // ✅ Order Status Summary
    const orderStatus = await Order.aggregate([
      { $group: { _id: "$status", value: { $sum: 1 } } },
      { $project: { name: "$_id", value: 1, _id: 0 } },
    ]);

    // ✅ Monthly Order Trend
    const monthlyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] }, // "YYYY-MM"
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          _id: 0,
          month: "$_id",
          orders: 1,
        },
      },
    ]);

    // ✅ Top Performing Lab Admins from Completed + Paid Orders
    const topLabAdmins = await Order.aggregate([
      { $match: { status: "Completed", paymentStatus: "paid" } }, // ✅ Added filter here
      { $unwind: "$items" },
      {
        $lookup: {
          from: "labs",
          localField: "items.labId",
          foreignField: "_id",
          as: "lab",
        }
      },
      { $unwind: "$lab" },
      {
        $lookup: {
          from: "users",
          localField: "lab.labAdmin",
          foreignField: "_id",
          as: "admin"
        }
      },
      { $unwind: "$admin" },
      {
        $group: {
          _id: "$admin._id",
          name: { $first: { $concat: ["$admin.firstName", " ", "$admin.lastName"] } },
          lab: { $first: "$lab.name" },
          orders: { $sum: 1 },
          revenue: { $sum: "$items.price" }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      totalUsers,
      totalLabs,
      totalOrders,
      totalRevenue,
      labsWithMostOrders,
      mostUsedTests,
      orderStatus,
      monthlyOrders,
      topLabAdmins,
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

    // Validation
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle image upload
    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    // Create user with verified status & forcePasswordChange
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      image,
      isVerified: true,               
      forcePasswordChange: true,     
    });

    // Send login email
    await sendEmail({
      to: email,
      subject: "Lab Admin Account Created - Digital LabCore",
      html: `
        <h2>Hello ${firstName},</h2>
        <p>You have been added as a <strong>${role}</strong> on Digital LabCore.</p>
        <p>Use the following credentials to log in:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>
          <a href="${process.env.FRONTEND_URL}/login">Click here to log in</a>.
          You will be asked to reset your password after your first login for security reasons.
        </p>
        <p>Welcome aboard!</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "User created and login email sent.",
      createdUser: newUser,
    });

  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;  
    }

    // Handle image upload
    if (req.file) {
      // If there's an existing image, you might want to delete it
      if (user.image) {
        // Delete old image file if needed
        // You can implement file deletion logic here if required
      }
      user.image = req.file.path;
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
export const deleteUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(403).json({ message: "You cannot delete your own account." });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "labadmin" && user.labId) {
      await Lab.findOneAndDelete({ labAdmin: id });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "User and his lab (if any) deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
export const getLabAdmins = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const labAdmins = await User.find({ role: "labadmin" })
      .select("firstName lastName email labId");  

    res.status(200).json({ success: true, labAdmins });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab admins", error: error.message });
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

    const updateData = {
      firstName,
      lastName,
      email,
    };

    if (req.file) {
      updateData.image = req.file.path; 
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
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

    const isPasswordCorrect = await bcrypt.compare(currentPassword.trim(), superAdmin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Hash the new 
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



// Lab Admin controller function

export const loginLabAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const labAdmin = await User.findOne({ email, role: "Lab Admin" });
    const labAdmin = await User.findOne({ email, role: "labadmin" }).select("+labId");

    if (!labAdmin) {
      return res.status(404).json({ message: "Lab Admin not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password.trim(), labAdmin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🛠 IMPORTANT: include lab in token payload
    const token = generateToken({
      _id: labAdmin._id,
      email: labAdmin.email,
      role: labAdmin.role,
      labId: labAdmin.labId,  
    });

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
export const getLabDashboardOverview = async (req, res) => {
  try {
    // const labId = req.user.labId;
    const labId = req.user.labId || req.user.lab;
    if (!labId)
      return res.status(400).json({ success: false, message: "Lab ID not found in token." });

    // ✅ Only fetch lab orders (all statuses)
    const orders = await Order.find({ "items.labId": labId });

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "Pending").length;
    const completedOrders = orders.filter((o) => o.status === "Completed").length;
    const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;
    const inProgressOrders = orders.filter((o) => o.status === "Progress").length;
    const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    // ✅ Pending report count
    const pendingReportsCount = await Order.countDocuments({
      "items.labId": labId,
      status: "Completed",
      "items.reportFile": { $in: [null, ""] },
    });

    // ✅ Orders over time chart
    const ordersOverTimeRaw = await Order.aggregate([
      { $match: { "items.labId": new mongoose.Types.ObjectId(labId) } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          Pending: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "Pending"] }, "$count", 0],
            },
          },
          Completed: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "Completed"] }, "$count", 0],
            },
          },
          Cancelled: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "Cancelled"] }, "$count", 0],
            },
          },
          InProgress: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "Progress"] }, "$count", 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const ordersOverTime = ordersOverTimeRaw.map((o) => ({
      date: o._id,
      Pending: o.Pending,
      Completed: o.Completed,
      Cancelled: o.Cancelled,
      InProgress: o.InProgress,
    }));

    // ✅ Tests & packages owned by this lab
    const [tests, packages] = await Promise.all([
      Test.find({ lab: labId }).select("_id name price rating bookedCount"),
      Package.find({ lab: labId }).select("_id name price rating bookedCount"),
    ]);

    const testPackages = [
      ...tests.map((item) => ({ ...item._doc, type: "Test" })),
      ...packages.map((item) => ({ ...item._doc, type: "Package" })),
    ];

    // ✅ Total Earnings: Only from completed + paid orders
    const paidCompletedOrders = await Order.find({
      status: "Completed",
      paymentStatus: "paid",
      "items.labId": labId,
    });

    const totalEarnings = paidCompletedOrders.reduce((sum, order) => {
      const labItems = order.items.filter((item) => item.labId.toString() === labId.toString());
      const labItemTotal = labItems.reduce((itemSum, item) => itemSum + (item.price || 0), 0);
      return sum + labItemTotal;
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        inProgressOrders,
        totalTests: tests.length,
        totalPackages: packages.length,
        completionRate,
        ordersOverTime,
        testPackages,
        totalEarnings,
        pendingReports: pendingReportsCount,
      },
    });
  } catch (error) {
    console.error("Error in LabDashboard API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
export const getLabForLabAdmin = async (req, res) => {
  try {
    const labAdminId = req.user.id; 

    const lab = await Lab.findOne({ labAdmin: labAdminId }).populate("createdBy", "firstName lastName email");

    if (!lab) {
      return res.status(404).json({ success: false, message: "No lab assigned to this Lab Admin." });
    }

    res.status(200).json({ success: true, lab });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lab for Lab Admin", error: error.message });
  }
};
export const updateLabAdminProfile = async (req, res) => {
  try {
    const labAdminId = req.user.id;
    let updates = { ...req.body };

    if (updates.password) {
      return res.status(400).json({ success: false, message: "Password update not allowed here." });
    }

    if (req.file) {
      updates.image = req.file.path;  
    }

    const updatedLabAdmin = await User.findByIdAndUpdate(labAdminId, updates, { new: true }).select("-password");

    if (!updatedLabAdmin) {
      return res.status(404).json({ success: false, message: "Lab Admin not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated", labAdmin: updatedLabAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating profile", error: error.message });
  }
};
export const updateLabDetails = async (req, res) => {
  try {
    const labAdminId = req.user.id;
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.path; // Cloudinary URL
    }

    const updatedLab = await Lab.findOneAndUpdate({ labAdmin: labAdminId }, updates, { new: true });

    if (!updatedLab) {
      return res.status(404).json({ success: false, message: "Lab not found for this Lab Admin" });
    }

    res.status(200).json({ success: true, message: "Lab details updated", lab: updatedLab });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating Lab", error: error.message });
  }
};
export const getLabAdminInbox = async (req, res) => {
  try {
    const labAdminId = req.user.id;
    if (!labAdminId) {
      return res.status(401).json({ 
        success: false,
        message: "Unauthorized: No user ID found" 
      });
    }

    if (!req.user.labId) {
      return res.status(400).json({ 
        success: false,
        message: "No lab associated with this admin" 
      });
    }

    const inboxMessages = await Query.find({ 
      receiverType: "labadmin", 
      labId: req.user.labId 
    })
    .populate("userId", "firstName lastName email")
    .sort({ createdAt: -1 })
    .lean()
    .catch(err => {
      console.error("Database query error:", err);
      throw new Error("Failed to fetch inbox messages");
    });

    if (!inboxMessages) {
      return res.status(200).json({ 
        success: true,
        inboxMessages: [] 
      });
    }

    res.status(200).json({ 
      success: true, 
      inboxMessages 
    });
  } catch (error) {
    console.error("Error in getLabAdminInbox:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching inbox messages", 
      error: error.message 
    });
  }
};
export const respondToLabAdminInbox = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const query = await Query.findByIdAndUpdate(
      id,
      { response, status: "responded" },
      { new: true }
    );

    if (!query) return res.status(404).json({ message: "Message not found" });

    res.status(200).json({ success: true, message: "Response sent successfully", query });
  } catch (error) {
    res.status(500).json({ message: "Error responding", error: error.message });
  }
};

