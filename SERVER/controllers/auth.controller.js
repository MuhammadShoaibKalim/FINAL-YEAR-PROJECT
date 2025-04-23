import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import { generateToken } from "../utils/auth.util.js";


export const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

   
    const errors = {};
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
        errors: { confirmPassword: "Passwords do not match" }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        errors: { email: "Please enter a valid email address" }
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        errors: { email: "This email is already registered" }
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      role:"user",
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

    const token = generateToken(user._id, user.email, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role:user.role,
      ownedLab:user.ownedLab
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
       console.log("Uploaded file details:", req.file);
       }

    // if (req.file && req.file.path) {
    //      updates.image = req.file.path;
    //     //  console.log("Image URL:", updates.image);
    //  }
    // if (req.file) {
    //   updates.image = `uploads/${req.file.filename}`;
    //   console.log("Image URL:", updates.image);
    // }
    if (req.file && req.file.path) {    
      updates.image = req.file.path; 
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

export const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User authenticated',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};





