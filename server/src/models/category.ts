import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;