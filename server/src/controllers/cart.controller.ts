import type { Request, Response } from "express";
import User from "../models/user";
import type { ICartItem } from "../models/user";

// Get user's cart
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(userId).select("cart");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.cart || [] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Update entire cart (replace all items)
export const updateCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Items must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { cart: items },
      { new: true }
    ).select("cart");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const item: ICartItem = req.body;
    if (!item.productId || !item.title || !item.price === undefined) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if item already exists (same product, diamond type, and size)
    const sizeKey = item.size?.trim() || "default";
    const existingItemIndex = user.cart.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.diamondType === item.diamondType &&
        (cartItem.size?.trim() || "default") === sizeKey
    );

    if (existingItemIndex > -1) {
      // Update quantity
      user.cart[existingItemIndex]!.quantity += item.quantity || 1;
    } else {
      // Add new item
      user.cart.push(item);
    }

    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Update item quantity
export const updateItemQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find and update the item
    const itemIndex = user.cart.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex]!.quantity = quantity;
    }

    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove item
    user.cart = user.cart.filter((item) => item.productId !== productId);

    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Clear entire cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { cart: [] },
      { new: true }
    ).select("cart");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};
