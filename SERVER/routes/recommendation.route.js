// serverside/routes/recommendation.route.js
import express from "express";
import { getTestRecommedation } from "../controllers/recommendation.controller.js";
const router = express.Router();

router.post("/recommend-tests", getTestRecommedation);

export default router;
