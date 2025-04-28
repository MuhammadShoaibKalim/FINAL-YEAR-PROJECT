import express from "express";
import { isAuthenticated, isLabAdmin, isSuperAdmin } from "../middlewares/auth.middleware.js";
import {
  submitQuery,
  getAllQueries,
  markQueryAsViewed,
  deleteQuery,
  respondToQuery,
  getUserQueries,
  getAllLabs,
  getInboxMessages, 
  respondToMessage, 
  deleteMessage, 
  markMessageViewed, 
  contactSuperAdmin 
} from "../controllers/query.controller.js";

const router = express.Router();

router.post("/submit", isAuthenticated, submitQuery);
router.get("/all", isAuthenticated, isSuperAdmin, getAllQueries);
router.put("/view/:id", isAuthenticated, isSuperAdmin, markQueryAsViewed);
router.put("/respond/:id", isAuthenticated, isSuperAdmin, respondToQuery);
router.delete("/delete/:id", isAuthenticated, isSuperAdmin, deleteQuery);
router.get("/user/:userId", isAuthenticated, getUserQueries);
router.get("/labs/all", getAllLabs);


// labadmin-superadmin inbox communication 
router.get("/inbox", isAuthenticated, getInboxMessages);
router.put("/respond/:messageId", isAuthenticated, isSuperAdmin, respondToMessage);
router.delete("/delete/:messageId", isAuthenticated, isSuperAdmin, deleteMessage);
router.put("/view/:messageId", isAuthenticated, isSuperAdmin, markMessageViewed);
router.post("/contact-superadmin", isAuthenticated,isLabAdmin, contactSuperAdmin);

export default router;
