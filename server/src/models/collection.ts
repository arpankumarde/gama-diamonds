import mongoose, { Schema } from "mongoose";

const CollectionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    image: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Collection = mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
export default Collection;
