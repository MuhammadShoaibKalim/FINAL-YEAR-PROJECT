import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import { generateToken } from "../utils/auth.util.js";


export const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required",
        data: null 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Password and confirm password do not match",
        data: null 
      });
    }

    const sanitizedEmail = email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format",
        data: null 
      });
    }

    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "User already exists",
        data: null 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: sanitizedEmail,
      password: hashedPassword
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        data: null
      });
    }

    const sanitizedEmail = email;
    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null
      });
    }

    const token = generateToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userResponse,
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


export const userLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updates.email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }
    }

    if (req.file) {
      //  console.log("Uploaded file details:", req.file);
       }

    if (req.file && req.file.path) {
         updates.image = req.file.path;
        //  console.log("Image URL:", updates.image);
     }



    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure:true,
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      data: null
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};





