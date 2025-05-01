import express from "express";
import { checkoutSession } from "../controllers/payment.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-checkout-session",isAuthenticated ,checkoutSession);
export default router;
