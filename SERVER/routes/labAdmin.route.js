import express from "express";
import {
  getLabAdminOverview,
  updateLabAdminProfile,
  getInboxMessages,
  respondToInboxMessage,
  getLabAdminProfile,
  loginLabAdmin,
  logoutLabAdmin,
  updateLabDetails
} from "../controllers/labAdmin.controller.js";
import { isAuthenticated, isLabAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Authentication Routes
router.post("/login", loginLabAdmin);
router.post("/logout", logoutLabAdmin);

// Protected Routes (Require Authentication & Lab Admin Role)
router.get("/overview", isAuthenticated, isLabAdmin, getLabAdminOverview);

// Lab Admin Profile (No need for `/:id`, as `req.user.id` is used)
router.get("/profile", isAuthenticated, isLabAdmin, getLabAdminProfile);
router.put("/profile", isAuthenticated, isLabAdmin, updateLabAdminProfile);

// Update Lab Details
router.put("/lab", isAuthenticated, isLabAdmin, updateLabDetails);

// Inbox Messages
router.get("/inbox", isAuthenticated, isLabAdmin, getInboxMessages);
router.post("/inbox/:id/respond", isAuthenticated, isLabAdmin, respondToInboxMessage);

export default router;
