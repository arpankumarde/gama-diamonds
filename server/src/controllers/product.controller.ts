import type { Request, Response } from "express";
import escapeStringRegexp from "escape-string-regexp";
import Product from "../models/product";
import Category from "../models/category";

const generateSlug = (name: string) =>
  name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

// Get all products with filters and pagination
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      carat,
      color,
      shape,
      metal,
      diamondType,
      search,
      sort = "-createdAt",
      isActive
    } = req.query;

    const filter: any = {};
    if (isActive !== "all") filter.isActive = true;

    if (category) {
      const categoryDoc = await Category.findOne(
        String(category).match(/^[a-f\d]{24}$/i)
          ? { _id: category }
          : { slug: category }
      );
      if (categoryDoc) filter.category = categoryDoc._id;
      else filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (carat) filter.carat = Number(carat);
    if (color) filter.color = color;
    if (shape) {
      const shapes = String(shape).split(',').map(s => s.trim()).filter(Boolean);
      filter.shape = shapes.length === 1 ? shapes[0] : { $in: shapes };
    }
    if (metal) {
      const metals = String(metal).split(',').map(s => s.trim()).filter(Boolean);
      filter.metal = metals.length === 1 ? metals[0] : { $in: metals };
    }
    if (diamondType) {
      const types = String(diamondType).split(',').map(s => s.trim()).filter(Boolean);
      filter.diamondType = types.length === 1 ? types[0] : { $in: types };
    }
    if (search) {
      const safeSearch = escapeStringRegexp(String(search));
      filter.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
        { tags: { $in: [safeSearch] } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Get single product by slug
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug, isActive: true }).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Create new product (Admin)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, sku, category, description, images, stock, carat, color, shape, metal, salePrice, tags, video, diamondType, isActive } = req.body;
    const slug = generateSlug(name);
    const product = await Product.create({ name, slug, price, sku, category, description, images, stock, carat, color, shape, metal, salePrice, tags, video, diamondType, isActive });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ success: false, message: msg });
  }
};

// Update product (Admin)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, sku, category, description, images, stock, carat, color, shape, metal, salePrice, tags, video, diamondType, isActive } = req.body;

    const update: any = { name, price, sku, category, description, images, stock, carat, color, shape, metal, salePrice, tags, diamondType, isActive };
    if (video !== undefined) update.video = video;

    // Remove undefined keys so existing DB values are not overwritten
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);

    const product = await Product.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ success: false, message: msg });
  }
};

// Delete product (Admin)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Toggle product active status (Admin)
export const toggleProductStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Update product stock (Admin)
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock < 0) {
      return res.status(400).json({ success: false, message: "Stock cannot be negative" });
    }

    const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Get featured products
export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isActive: true })
      .populate("category", "name slug")
      .sort("-createdAt")
      .limit(Number(limit));

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Get related products
export const getRelatedProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
      isActive: true
    })
      .populate("category", "name slug")
      .limit(Number(limit));

    res.status(200).json({ success: true, data: relatedProducts });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};

// Get filter options
export const getFilterOptions = async (req: Request, res: Response) => {
  try {
    const [colors, shapes, metals, categories] = await Promise.all([
      Product.distinct("color", { isActive: true }),
      Product.distinct("shape", { isActive: true }),
      Product.distinct("metal", { isActive: true }),
      Category.find({ isActive: true }, "name slug")
    ]);

    const priceRange = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, min: { $min: "$price" }, max: { $max: "$price" } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        colors: colors.filter(Boolean),
        shapes: shapes.filter(Boolean),
        metals: metals.filter(Boolean),
        categories,
        priceRange: priceRange[0] || { min: 0, max: 0 }
      }
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ success: false, message: msg });
  }
};
