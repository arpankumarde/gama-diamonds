import type { Request, Response } from "express";
import Category from "../models/category.js";

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find({ isActive: true }).populate("parent", "name slug");
    res.status(200).json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const category = await Category.findById(req.params.id).populate("parent", "name slug");
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const { name, description, parent } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

    const existing = await Category.findOne({ slug });
    if (existing) return res.status(400).json({ success: false, message: "Category already exists" });

    const category = await Category.create({ name, slug, description, parent });
    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
