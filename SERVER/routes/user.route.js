import express from "express";
import { isAuthenticated, isSuperAdmin } from "../middlewares/auth.middleware.js";
import {
  getUsers, 
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { createLabAdmin } from "../controllers/superAdmin.controller.js";

const router = express.Router();

// Super Admin Creates Lab Admin(Users)
router.post("/create-labadmin", isAuthenticated, isSuperAdmin, createLabAdmin);
router.get("/", isAuthenticated, isSuperAdmin, getUsers);
router.put("/:id", isAuthenticated,isSuperAdmin, updateUser);
router.delete("/:id", isAuthenticated,isSuperAdmin, deleteUser);

export default router;
