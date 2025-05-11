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
import { Test, Package } from "../models/testpackage.model.js";

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

//get all test and packages publicaly
router.get("/public-tests", getAllPublicTests);
router.get("/public-packages", getAllPublicPackages);

// New routes for lab-specific tests and packages
router.get("/lab/:labId/tests", async (req, res) => {
  try {
    const { labId } = req.params;
    const tests = await Test.find({ lab: labId })
      .select("name price discount bookedCount rating type description")
      .populate("lab", "name location");
    res.status(200).json({ success: true, tests });
  } catch (error) {
    console.error("Error fetching lab tests:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/lab/:labId/packages", async (req, res) => {
  try {
    const { labId } = req.params;
    const packages = await Package.find({ lab: labId })
      .select("name price discount bookedCount rating description type")
      .populate("lab", "name location");
    res.status(200).json({ success: true, packages });
  } catch (error) {
    console.error("Error fetching lab packages:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
