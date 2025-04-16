import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

// Middleware to Authenticate User
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
  }
};

// Check if user is a Super Admin
export const isSuperAdmin = (req, res, next) => {
  // console.log('User:', req.user);
  if (!req.user || req.user.role !== "Super Admin") {
    return res.status(403).json({ message: "Access denied. Only Super Admins allowed." });
  }
  next(); 
};

// Middleware to Ensure Lab Admin Access
export const isLabAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    if (req.user.role !== "Lab Admin") {
      return res.status(403).json({ message: "Access denied. Only Lab Admins allowed." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
  }
};
// Middleware for lab admin and super admin
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);  

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      if (req.user.role !== "Super Admin" && req.user.role !== "Lab Admin") {
        return res.status(403).json({ message: "Forbidden: Access Denied" });
      }

      next(); 
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};


