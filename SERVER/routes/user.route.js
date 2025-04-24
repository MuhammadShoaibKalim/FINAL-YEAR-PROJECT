import express from "express";
import { 
    userRegister, 
    userLogin, 
    userLogout, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserAccount, 
    checkUser} from "../controllers/user.controller.js";
import { isAuthenticated, isSuperAdmin } from "../middlewares/auth.middleware.js";
import {
  getUsers, 
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { createLabAdmin } from "../controllers/admin.controller.js";
import upload from '../middlewares/upload.middleware.js';



const router = express.Router();

//  Public Routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

// Protected Routes (Require Authentication)
router.get("/profile", isAuthenticated, getUserProfile);
router.put('/profile/:id', isAuthenticated, upload.single('image'), updateUserProfile);
router.get("/getuser", isAuthenticated, checkUser);
router.delete("/:id", isAuthenticated, deleteUserAccount);





// Super Admin Creates Lab Admin(Users)
router.post("/create-labadmin", isAuthenticated, isSuperAdmin, createLabAdmin);
router.get("/", isAuthenticated, isSuperAdmin, getUsers);
router.put("/:id", isAuthenticated,isSuperAdmin, updateUser);
router.delete("/:id", isAuthenticated,isSuperAdmin, deleteUser);

export default router;
