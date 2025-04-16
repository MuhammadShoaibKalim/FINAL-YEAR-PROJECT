import express from "express";
import { getTestRecommendations } from "../controllers/ai.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";  

const router = express.Router();

router.post("/recommend", isAuthenticated, getTestRecommendations);

export default router;
