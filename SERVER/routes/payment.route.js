import express from "express";
import { checkoutSession } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/create-checkout-session", checkoutSession);
export default router;
