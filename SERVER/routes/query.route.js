import express from "express";
import { isAuthenticated, isSuperAdmin } from "../middlewares/auth.middleware.js";
import {
  submitQuery,
  getAllQueries,
  markQueryAsViewed,
  deleteQuery,
  respondToQuery,
  getUserQueries,
} from "../controllers/query.controller.js";

const router = express.Router();

router.post("/submit", isAuthenticated, submitQuery);
router.get("/all", isAuthenticated, isSuperAdmin, getAllQueries);
router.put("/view/:id", isAuthenticated, isSuperAdmin, markQueryAsViewed);
router.put("/respond/:id", isAuthenticated, isSuperAdmin, respondToQuery);
router.delete("/delete/:id", isAuthenticated, isSuperAdmin, deleteQuery);
router.get("/user/:userId", isAuthenticated, getUserQueries);

export default router;
