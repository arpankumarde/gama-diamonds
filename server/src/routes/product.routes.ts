import express from "express";
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  updateStock,
  getFeaturedProducts,
  getRelatedProducts,
  getFilterOptions
} from "../controllers/product.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/filters", getFilterOptions);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);
router.get("/:id/related", getRelatedProducts);

// Admin routes
router.post("/", authenticate, authorize("admin", "superadmin"), createProduct);
router.put("/:id", authenticate, authorize("admin", "superadmin"), updateProduct);
router.delete("/:id", authenticate, authorize("admin", "superadmin"), deleteProduct);
router.patch("/:id/status", authenticate, authorize("admin", "superadmin"), toggleProductStatus);
router.patch("/:id/stock", authenticate, authorize("admin", "superadmin"), updateStock);

export default router;
