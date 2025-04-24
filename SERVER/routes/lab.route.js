import express from "express";
import {
  addLab,
  updateLab,
  deleteLab,
  // getLabById,
  getLab,
  getAllLabs,
} from "../controllers/lab.controller.js";
import {  isAuthenticated, isLabAdmin, isSuperAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, isSuperAdmin, upload.single("image"), addLab);
// router.post("/create", isAuthenticated, isSuperAdmin , addLab);
router.get("/", isAuthenticated, isSuperAdmin, getLab);
router.get("/all", isAuthenticated, isSuperAdmin, getAllLabs);
// router.get("/:id", isAuthenticated, isSuperAdmin, isLabAdmin, getLabById);
router.put("/:id", isAuthenticated, isLabAdmin, updateLab);
router.delete("/:id", isAuthenticated,isLabAdmin, deleteLab);

export default router;
