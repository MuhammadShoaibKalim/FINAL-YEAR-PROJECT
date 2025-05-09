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
  updateLabOrderStatus,
  cancelLabOrder,
  uploadReport
} from "../controllers/order.controller.js";

import { isAuthenticated, isLabAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { addPackageReview, addTestReview } from "../controllers/testpackage.controller.js";

const router = express.Router();

// Order routes
router.post("/create", isAuthenticated, createOrder);
router.get("/user", isAuthenticated, getUserOrders);
router.get("/all", isAuthenticated, isLabAdmin, getAllOrders);
router.get("/lab", isAuthenticated, isLabAdmin, getLabOrders);
router.post("/:id/upload-report", isAuthenticated, isLabAdmin, upload.single("report"), uploadReport);
router.put("/:id/update-status", isAuthenticated, isLabAdmin, upload.single("report"), updateOrderStatus);
router.put("/:id/cancel", isAuthenticated, cancelOrder);
router.delete("/:id", isAuthenticated, isLabAdmin, deleteOrder);
router.get("/:id", isAuthenticated, getOrderById);
router.post("/review/:id", isAuthenticated, addTestReview);
router.post("/review/:id", isAuthenticated, addPackageReview);
router.put("/:orderId/lab/:labId/status", isAuthenticated, isLabAdmin, updateLabOrderStatus);
router.put("/:orderId/cancel/:labId", isAuthenticated, cancelLabOrder);

export default router;