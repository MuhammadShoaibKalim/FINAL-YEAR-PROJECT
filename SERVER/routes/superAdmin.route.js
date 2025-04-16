import express from "express";
import {
  createSuperAdmin, loginSuperAdmin, logoutSuperAdmin,
  getInbox, respondToInbox, getSettings, updateSettings,
  superAdminOverview,changePassword,
  createLabAdmin
} from "../controllers/superAdmin.controller.js";
import { isAuthenticated, isSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create, login and logout Super Admin 
router.post("/create-superadmin", (req, res, next) => {
  const secretKey = process.env.SUPERADMIN_SECRET_KEY;
  const providedKey = req.headers["x-secret-key"];

  if (providedKey !== secretKey) {
    return res.status(403).json({ message: "Access denied. Invalid secret key." });
  }
  next();
}, createSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/logout", logoutSuperAdmin);

// Super Admin Overview
router.get("/overview", isAuthenticated, isSuperAdmin, superAdminOverview);


//create lab admin
router.post("/create-labadmin",isAuthenticated, isSuperAdmin, createLabAdmin);

// Inbox Routes
router.get("/", isAuthenticated, isSuperAdmin,  getInbox);
router.post("/:id", isAuthenticated, isSuperAdmin, respondToInbox);

// Super Admin Settings Routes
router.get("/get-settings", isAuthenticated, isSuperAdmin,  getSettings);
router.put("/update-settings", isAuthenticated, isSuperAdmin,  updateSettings);
router.put("/password", isAuthenticated, isSuperAdmin, changePassword);

export default router;
