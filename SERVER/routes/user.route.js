import express from "express";
import { 
    userRegister, 
    userLogin, 
    userLogout, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserAccount, 
    checkUser,
    resetPassword} from "../controllers/user.controller.js";
import { isAuthenticated, isSuperAdmin } from "../middlewares/auth.middleware.js";
import {
  getUsers, 
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { createUser } from "../controllers/admin.controller.js";
import upload from '../middlewares/upload.middleware.js';
import { forgotPassword } from "../controllers/user.controller.js";



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
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);







// Super Admin Creates Lab Admin(Users)
router.post("/create-labadmin", isAuthenticated, isSuperAdmin, createUser);
router.get("/", isAuthenticated, isSuperAdmin, getUsers);
router.put("/:id", isAuthenticated,isSuperAdmin, updateUser);
router.delete("/:id", isAuthenticated,isSuperAdmin, deleteUser);

export default router;
