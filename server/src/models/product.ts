import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: String, trim: true }],
    carat: { type: Number, min: 0 },
    color: { type: String, enum: ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"] },
    clarity: { type: String, enum: ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"] },
    cut: { type: String, enum: ["Excellent", "Very Good", "Good", "Fair", "Poor"] },
    shape: { type: String, enum: ["Round", "Princess", "Cushion", "Emerald", "Oval", "Radiant", "Asscher", "Marquise", "Heart", "Pear"] },
    metal: { type: String, enum: ["Gold", "White Gold", "Rose Gold", "Yellow Gold", "Platinum", "Silver", "Sterling Silver"] },
    stock: { type: Number, default: 0, min: 0 },
    tags: [{ type: String, trim: true, lowercase: true }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
