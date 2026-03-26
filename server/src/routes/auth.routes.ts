import express from "express";
import { register, login, getMe, logout, getAllUsers, updateUserRole, createAdmin } from "../controllers/auth.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Setup endpoint - secured with SETUP_TOKEN
router.post("/admin/create", createAdmin);

// Protected
router.get("/me", authenticate, getMe);
router.post("/logout", authenticate, logout);

// Admin only
router.get("/users", authenticate, authorize("admin", "superadmin"), getAllUsers);

// Superadmin only
router.patch("/users/:id/role", authenticate, authorize("superadmin"), updateUserRole);

export default router;
