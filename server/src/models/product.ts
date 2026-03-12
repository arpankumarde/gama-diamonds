import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: String, trim: true }],
    carat: { type: Number, min: 0 },
    color: { type: String, trim: true },
    clarity: { type: String, trim: true },
    cut: { type: String, trim: true },
    shape: { type: String, trim: true },
    metal: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    tags: [{ type: String, trim: true, lowercase: true }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
