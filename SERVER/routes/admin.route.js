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
  // getLabAdminOverview,
  updateLabAdminProfile,
  // getInboxMessages,
  // respondToInboxMessage,
  getLabAdminProfile,
  loginLabAdmin,
  logoutLabAdmin,
  updateLabDetails,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getLabAdmins,
  getLabForLabAdmin,
  getLabAdminInbox,
  respondToLabAdminInbox,
  getLabDashboardOverview,
  respondToLabAdmin
} from "../controllers/admin.controller.js";


import { 
  isAuthenticated, 
  isSuperAdmin, 
  isLabAdmin 
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post("/create-superadmin", (req, res, next) => {
  const secretKey = process.env.SUPERADMIN_SECRET_KEY;
  const providedKey = req.headers["x-secret-key"];

  if (providedKey !== secretKey) {
    return res.status(403).json({ message: "Access denied. Invalid secret key." });
  }
  next();
},                   createSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/logout", logoutSuperAdmin);
router.get("/overview", isAuthenticated, isSuperAdmin, superAdminOverview);
router.post("/create-user", isAuthenticated, isSuperAdmin, upload.single('profileImage'), createUser);
router.put("/update-user/:id", isAuthenticated, isSuperAdmin,upload.single("profileImage"), updateUser);
router.delete("/delete-user/:id", isAuthenticated, isSuperAdmin, deleteUser);
router.get("/users", isAuthenticated, isSuperAdmin, getAllUsers);
router.get("/labadmins", isAuthenticated, isSuperAdmin, getLabAdmins);

router.get("/superadmin-inbox", isAuthenticated, isSuperAdmin, getInbox);
router.post("/:id", isAuthenticated, isSuperAdmin, respondToInbox);
router.get('/superadmin-responses', isAuthenticated, respondToLabAdmin);
router.get("/get-settings", isAuthenticated, isSuperAdmin, getSettings);
router.put("/update-settings", isAuthenticated, isSuperAdmin, upload.single("image"), updateSettings);
router.put("/password", isAuthenticated, isSuperAdmin, changePassword);


// Lab Admin Routes
router.post("/login", loginLabAdmin);
router.post("/logout", logoutLabAdmin);
// router.get("/overview", isAuthenticated, isLabAdmin, getLabAdminOverview);
// router.get("/overview", isAuthenticated, isLabAdmin, getLabAdminOverview);getLabDashboardOverview
router.get("/labdashboard", isAuthenticated, isLabAdmin, getLabDashboardOverview);
router.get("/profile", isAuthenticated, isLabAdmin, getLabAdminProfile);
router.get("/lab", isAuthenticated, isLabAdmin, getLabForLabAdmin);
router.put("/:id", isAuthenticated, isLabAdmin,upload.single("profileImage"),updateLabAdminProfile);
router.put("/lab", isAuthenticated, isLabAdmin,upload.single("profileImage"), updateLabDetails);
// router.get("/inbox", isAuthenticated, isLabAdmin, getInboxMessages);
// router.post("/inbox/:id/respond", isAuthenticated, isLabAdmin, respondToInboxMessage);
router.get("/inbox", isAuthenticated, isLabAdmin, getLabAdminInbox);
router.put("/respond/:id", isAuthenticated, isLabAdmin, respondToLabAdminInbox);
export default router;

