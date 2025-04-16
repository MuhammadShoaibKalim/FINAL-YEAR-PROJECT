import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import { generateToken } from "../utils/auth.util.js";


// User Registration
export const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password do not match" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: trimmedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });
    await newUser.save();

    const token = generateToken(newUser._id, newUser.email)
    await newUser.save();

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }
     

    const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.json({ message: 'Incorrect password or email' });
}
const token = generateToken(user._id, user.email);
res.cookie("token", token, { withCredentials: true, httpOnly: false });
res.status(201).json({ message: "User logged in successfully", success: true, token
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


//  User Logout
export const userLogout = (req, res) => {
  try {
    res.status(200).cookie("accessToken", "", { maxAge: 0 }).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, address, city, state, image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, phoneNo, address, city, state, image },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profilesss updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("accessToken").status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





