import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
