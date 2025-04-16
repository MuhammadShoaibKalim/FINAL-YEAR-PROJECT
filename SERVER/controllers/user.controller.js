import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

  // controllers/Users/superAdmin.controller.js
  export const getUsers = async (req, res) => {
    try {
      const users = await User.find({ role: "Lab Admin" }).select("-password");
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching Lab Admins", error: error.message });
    }
  };
  export const updateUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userId = req.params.id;
      const requestingUser = req.user; 
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Super Admin can update anyone, Lab Admin can only update their own profile
      if (requestingUser.role !== "Super Admin" && requestingUser._id.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized to update this profile" });
      }
  
      // Update only provided fields
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };
  export const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Lab Admin not found" });
      }
  
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "Lab Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Lab Admin", error: error.message });
    }
  };
