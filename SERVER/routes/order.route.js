// ✅ routes/order.routes.js
import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getLabOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
  getOrderById,
} from "../controllers/order.controller.js";

import { isAuthenticated, isLabAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Order routes
router.post("/create", isAuthenticated, createOrder);
router.get("/user", isAuthenticated, getUserOrders);
router.get("/all", isAuthenticated, isLabAdmin, getAllOrders);
router.get("/lab", isAuthenticated, isLabAdmin, getLabOrders);

// router.put("/:id/status", isAuthenticated, isLabAdmin,upload.single("report"), updateOrderStatus);
router.put("/:id/update-status", isAuthenticated, isLabAdmin, upload.single("report"), updateOrderStatus);
// router.put("/:id/update-status", isAuthenticated, isLabAdmin, updateOrderStatus);
router.put("/:id/cancel", isAuthenticated, cancelOrder);
router.delete("/:id", isAuthenticated, isLabAdmin, deleteOrder);

router.get("/:id", isAuthenticated, getOrderById);

export default router;