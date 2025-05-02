import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
  cancelOrder,
  addToCart,
  removeFromCart,
  getUserCart,
  getCartItem,
  clearCart
} from "../controllers/order.controller.js";
import { 
  isAuthenticated,
  isLabAdmin 
} from "../middlewares/auth.middleware.js";
const router = express.Router();


// Order routes
router.post("/create", isAuthenticated, createOrder);
router.get("/user", isAuthenticated, getUserOrders);
router.get("/all", isAuthenticated, isLabAdmin, getAllOrders);
router.put("/:id/status", isAuthenticated, isLabAdmin, updateOrderStatus);
router.put("/:id/cancel", isAuthenticated, cancelOrder);
router.delete("/:id", isAuthenticated, isLabAdmin, deleteOrder);



// Cart routes
router.post('/add', isAuthenticated, addToCart);
router.get('/', isAuthenticated, getUserCart);
router.get('/:id', isAuthenticated, getCartItem);
router.delete('/remove/:id', isAuthenticated, removeFromCart);
router.delete('/clear', isAuthenticated, clearCart);


export default router;



