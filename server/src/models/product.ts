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
    shape: { type: String, enum: ["Round", "Princess", "Solitaire", "Cushion", "Three Stone", "Halo", "Emerald", "Oval", "Radiant", "Asscher", "Marquise", "Heart", "Pear", "Elongated Cushion", "Trillion", "Baguette", "Rose Cut"] },
    metal: { type: String, enum: ["9K White Gold", "9K Yellow Gold", "9K Rose Gold", "18K Rose Gold", "18K White Gold", "18K Yellow Gold", "Platinum"] },
    stock: { type: Number, default: 0, min: 0 },
    tags: [{ type: String, trim: true, lowercase: true }],
    video: { type: String },
    diamondType: { type: String, enum: ["Lab Diamond", "Natural Diamond", "Lab Diamond Engagement Rings", "Emerald Cut", "Coloured Diamonds", "Real Diamonds Engagement Rings"] },
    collectionRef: { type: Schema.Types.ObjectId, ref: "Collection" },
    subCollection: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
