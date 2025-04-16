import express from "express";
import {
  addLab,
  updateLab,
  deleteLab,
  // getLabById,
  // getAllLabs,
  getLab,
} from "../controllers/lab.controller.js";
import {  isAuthenticated, isLabAdmin, isSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, isSuperAdmin , addLab);
router.get("/", isAuthenticated, isLabAdmin, getLab);
// router.get("/:id", isAuthenticated, isSuperAdmin, isLabAdmin, getLabById);
router.put("/:id", isAuthenticated, isLabAdmin, updateLab);
router.delete("/:id", isAuthenticated,isLabAdmin, deleteLab);

export default router;
