import express from "express";
import {
  createCollection,
  updateCollection,
  addProduct,
  removeProduct,
  getCollections,
  getCollectionById,
  deleteCollection,
  addSubCollection,
  deleteSubCollection
} from "../controllers/collection.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getCollections);
router.get("/:id", getCollectionById);

// Admin only
router.post("/", authenticate, authorize("admin", "superadmin"), createCollection);
router.put("/:id", authenticate, authorize("admin", "superadmin"), updateCollection);
router.patch("/:id/products/add", authenticate, authorize("admin", "superadmin"), addProduct);
router.delete("/:id/products/:productId", authenticate, authorize("admin", "superadmin"), removeProduct);
router.delete("/:id", authenticate, authorize("admin", "superadmin"), deleteCollection);
router.post("/:id/subcollections", authenticate, authorize("admin", "superadmin"), addSubCollection);
router.delete("/:id/subcollections/:subId", authenticate, authorize("admin", "superadmin"), deleteSubCollection);

export default router;
