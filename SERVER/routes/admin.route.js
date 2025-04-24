import express from "express";
import {
  createSuperAdmin, 
  loginSuperAdmin, 
  logoutSuperAdmin,
  getInbox,
  respondToInbox, 
  getSettings, 
  updateSettings,
  superAdminOverview, 
  changePassword,
  createLabAdmin,
  getAllLabAdmins
} from "../controllers/admin.controller.js";
import { 
  isAuthenticated, 
  isSuperAdmin, 
  isLabAdmin 
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  getLabAdminOverview,
  updateLabAdminProfile,
  getInboxMessages,
  respondToInboxMessage,
  getLabAdminProfile,
  loginLabAdmin,
  logoutLabAdmin,
  updateLabDetails
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/create-superadmin", (req, res, next) => {
  const secretKey = process.env.SUPERADMIN_SECRET_KEY;
  const providedKey = req.headers["x-secret-key"];

  if (providedKey !== secretKey) {
    return res.status(403).json({ message: "Access denied. Invalid secret key." });
  }
  next();
}, createSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/logout", logoutSuperAdmin);
router.get("/overview", isAuthenticated, isSuperAdmin, superAdminOverview);
router.post("/create-labadmin", isAuthenticated, isSuperAdmin, createLabAdmin);
router.get("/labadmins", isAuthenticated, isSuperAdmin, getAllLabAdmins);
router.get("/", isAuthenticated, isSuperAdmin, getInbox);
router.post("/:id", isAuthenticated, isSuperAdmin, respondToInbox);
router.get("/get-settings", isAuthenticated, isSuperAdmin, getSettings);
router.put("/update-settings", isAuthenticated, isSuperAdmin, upload.single("profileImage"), updateSettings);
router.put("/password", isAuthenticated, isSuperAdmin, changePassword);


// Lab Admin Routes
router.post("/login", loginLabAdmin);
router.post("/logout", logoutLabAdmin);
router.get("/overview", isAuthenticated, isLabAdmin, getLabAdminOverview);
router.get("/profile", isAuthenticated, isLabAdmin, getLabAdminProfile);
router.put("/:id", isAuthenticated, isLabAdmin, updateLabAdminProfile);
router.put("/lab", isAuthenticated, isLabAdmin, updateLabDetails);
router.get("/inbox", isAuthenticated, isLabAdmin, getInboxMessages);
router.post("/inbox/:id/respond", isAuthenticated, isLabAdmin, respondToInboxMessage);

export default router;

