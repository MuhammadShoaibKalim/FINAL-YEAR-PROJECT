import express from "express";
import {
  addLab,
  updateLab,
  deleteLab,
  // getLabById,
  getLab,
  getAllLabs,
} from "../controllers/lab.controller.js";
import {  isAuthenticated, isLabAdmin, isSuperAdmin, protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, isSuperAdmin, upload.single("image"), addLab);
router.get("/", isAuthenticated, isSuperAdmin, getLab);
router.get("/all", isAuthenticated, isSuperAdmin, getAllLabs);
// router.get("/:id", isAuthenticated, isSuperAdmin, isLabAdmin, getLabById);
router.put("/:id",isAuthenticated, protect, upload.single("image"), updateLab);
router.delete("/:id", protect, deleteLab);

export default router;
