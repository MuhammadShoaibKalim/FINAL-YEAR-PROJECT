import express from "express";
import { 
  createTest, updateTest, deleteTest, getAllTests,
  createPackage, updatePackage, deletePackage, getAllPackages, 
  getPackageById,
  getTestById
} from "../controllers/testpackage.controller.js";
import { isLabAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Test Routes
router.post("/add-test", isAuthenticated, isLabAdmin, createTest);
router.put("/update-test/:id", isAuthenticated, isLabAdmin, updateTest);
router.delete("/delete-test/:id", isAuthenticated, isLabAdmin, deleteTest);
router.get("/get-all-tests", isAuthenticated, getAllTests);
router.get("/get-test/:id", isAuthenticated, getTestById);


// Package Routes
router.post("/add-package", isAuthenticated, isLabAdmin, createPackage);
router.put("/update-package/:id", isAuthenticated, isLabAdmin, updatePackage);
router.delete("/delete-package/:id", isAuthenticated, isLabAdmin, deletePackage);
router.get("/get-all-packages", isAuthenticated, getAllPackages);
router.get("/get-package/:id", isAuthenticated, getPackageById);

export default router;
