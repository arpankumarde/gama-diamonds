import { Router } from "express";
import { authenticate } from "../middleware/index";
import {
  getCart,
  updateCart,
  addToCart,
  updateItemQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get user's cart
router.get("/", getCart);

// Update entire cart (replace all items)
router.put("/", updateCart);

// Add item to cart
router.post("/add", addToCart);

// Update item quantity
router.patch("/item", updateItemQuantity);

// Remove item from cart
router.delete("/item", removeFromCart);

// Clear entire cart
router.delete("/", clearCart);

export default router;
