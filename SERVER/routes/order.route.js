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

//Need to test -> //
router.post("/create", isAuthenticated, createOrder);
router.get("/", isAuthenticated, isLabAdmin, getUserOrders);
router.get("/all", isAuthenticated, isLabAdmin, getAllOrders);
router.get("/:id", isAuthenticated, getUserOrders);
router.put("/:id/status", isAuthenticated, isLabAdmin, updateOrderStatus);
router.put("/:id/cancel", isAuthenticated, cancelOrder);
router.delete("/:id", isAuthenticated, isLabAdmin, deleteOrder);//

export default router;
