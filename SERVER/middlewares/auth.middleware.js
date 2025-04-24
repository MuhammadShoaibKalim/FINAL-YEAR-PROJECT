import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Helper to verify token and attach user to req
const extractUserFromToken = async (req) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) throw new Error("No token provided");

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded || !decoded.id) throw new Error("Invalid token");

  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new Error("User not found");

  return user;
};

// Middleware to Authenticate Any User
export const isAuthenticated = async (req, res, next) => {
  try {
    req.user = await extractUserFromToken(req);
    next();
  } catch (error) {
    return res.status(401).json({ message: `Unauthorized: ${error.message}` });
  }
};

// Middleware for Super Admin Access
export const isSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied. Only Super Admins allowed." });
  }
  next();
};

// Middleware for Lab Admin Access
export const isLabAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "labadmin") {
    return res.status(403).json({ message: "Access denied. Only Lab Admins allowed." });
  }
  next();
};

// Middleware for Both Lab Admin and Super Admin Access
export const protect = async (req, res, next) => {
  try {
    req.user = await extractUserFromToken(req);
    if (["superadmin", "labadmin"].includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden: Access Denied" });
  } catch (error) {
    return res.status(401).json({ message: `Unauthorized: ${error.message}` });
  }
};
