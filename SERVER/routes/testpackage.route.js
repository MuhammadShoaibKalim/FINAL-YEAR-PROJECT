import express from "express";
import { 
  createTest,
  updateTest,
  deleteTest,
  getAllTests,
  getTestById,
  createPackage,
  updatePackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  addTestReview,
  addPackageReview,
  addFeedback,
  getAllPublicTests,
  getAllPublicPackages
} from "../controllers/testpackage.controller.js";
import { isAuthenticated, isLabAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Test Routes -------------------

router.post("/add-test", isAuthenticated, isLabAdmin, createTest);
router.put("/update-test/:id", isAuthenticated, isLabAdmin, updateTest);
router.delete("/delete-test/:id", isAuthenticated, isLabAdmin, deleteTest);
router.get("/get-all-tests", isAuthenticated, getAllTests);
router.get("/get-test/:id", isAuthenticated, getTestById);
router.post("/review/:id", isAuthenticated, addTestReview);
router.post("/review/:id", isAuthenticated, addPackageReview);
router.post("/feedback/add", isAuthenticated, addFeedback);



//Package Routes -------------------


router.post("/add-package", isAuthenticated, isLabAdmin, createPackage);
router.put("/update-package/:id", isAuthenticated, isLabAdmin, updatePackage);
router.delete("/delete-package/:id", isAuthenticated, isLabAdmin, deletePackage);
router.get("/get-all-packages", isAuthenticated, getAllPackages);
router.get("/get-package/:id", isAuthenticated, getPackageById);


//get all test and packages
router.get("/public-tests", isAuthenticated, getAllPublicTests);
router.get("/public-packages", isAuthenticated, getAllPublicPackages);


export default router;
