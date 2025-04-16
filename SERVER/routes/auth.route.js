import express from "express";
import { 
    userRegister, 
    userLogin, 
    userLogout, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserAccount } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";  
const router = express.Router();

//  Public Routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

// Protected Routes (Require Authentication)
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/:id", isAuthenticated, updateUserProfile);
router.delete("/:id", isAuthenticated, deleteUserAccount);



export default router;
