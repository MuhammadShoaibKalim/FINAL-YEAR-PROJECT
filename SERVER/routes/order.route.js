import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
  cancelOrder
} from "../controllers/order.controller.js";
import { isAuthenticated, isLabAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create", isAuthenticated, createOrder);
router.get("/my", isAuthenticated, getUserOrders);
router.get("/all", isAuthenticated, isLabAdmin, getAllOrders);
router.put("/:id/status", isAuthenticated, isLabAdmin, updateOrderStatus);
router.put("/:id/cancel", isAuthenticated, cancelOrder);
router.delete("/:id", isAuthenticated, isLabAdmin, deleteOrder);

export default router;
