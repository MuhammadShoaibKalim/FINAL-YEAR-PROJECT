import express from "express";
import { 
    userRegister, 
    userLogin, 
    userLogout, 
    getUserProfile, 
    updateUserProfile, 
    deleteUserAccount, 
    checkUser} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js"; 
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



export default router;
