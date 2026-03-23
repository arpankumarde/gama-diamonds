import express from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin only
router.post("/", authenticate, authorize("admin", "superadmin"), createCategory);
router.put("/:id", authenticate, authorize("admin", "superadmin"), updateCategory);
router.delete("/:id", authenticate, authorize("admin", "superadmin"), deleteCategory);

export default router;
