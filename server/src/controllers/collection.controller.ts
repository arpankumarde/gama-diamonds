import type { Request, Response } from "express";
import mongoose from "mongoose";
import Collection from "../models/collection.js";
import Product from "../models/product.js";

const generateSlug = (name: string) =>
  name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, description, categories, image, isActive, sortOrder, productIds } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "name is required" });
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ success: false, message: "At least one category is required" });
    }

    const slug = generateSlug(name);

    const existing = await Collection.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Collection already exists" });
    }

    const validIds: mongoose.Types.ObjectId[] = [];
    if (Array.isArray(productIds) && productIds.length > 0) {
      const found = await Product.find({ _id: { $in: productIds }, isActive: true }).select("_id");
      validIds.push(...found.map((p) => p._id as mongoose.Types.ObjectId));
    }

    const collection = await Collection.create({
      name, slug, description, categories, image, isActive, sortOrder,
      products: validIds
    });

    res.status(201).json({ success: true, data: collection });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, categories, image, isActive, sortOrder } = req.body;

    const updateData: any = { description, image, isActive, sortOrder };
    if (name) {
      updateData.name = name;
      updateData.slug = generateSlug(name);
    }
    if (categories && Array.isArray(categories) && categories.length > 0) {
      updateData.categories = categories;
    }

    const collection = await Collection.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate("categories", "name slug")
      .populate("products", "name sku price images");

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, data: collection });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId is required" });
    }

    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found or inactive" });
    }

    const collection = await Collection.findByIdAndUpdate(
      id,
      { $addToSet: { products: productId } },
      { new: true }
    ).populate("products", "name sku price images");

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, data: collection });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.params;

    const collection = await Collection.findByIdAndUpdate(
      id,
      { $pull: { products: productId } },
      { new: true }
    ).populate("products", "name sku price images");

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, data: collection });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollections = async (_req: Request, res: Response) => {
  try {
    const collections = await Collection.find({ isActive: true })
      .populate("categories", "name slug")
      .populate("products", "name sku price images")
      .sort("sortOrder");
    res.status(200).json({ success: true, data: collections });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCollectionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id)
      .populate("categories", "name slug")
      .populate("products", "name sku price images carat color clarity cut shape metal");

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, data: collection });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findByIdAndDelete(id);

    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, message: "Collection deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
