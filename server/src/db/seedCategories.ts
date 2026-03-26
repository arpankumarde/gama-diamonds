import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

const categories = [
  { name: "New Arrivals",        slug: "new-arrival",        image: "/images/newarrival.webp",     featured: true },
  { name: "Engagement Rings",    slug: "engagement-rings",   image: "/images/engagemnetring.webp", featured: true },
  { name: "Eternity Rings",      slug: "eternity-rings",     image: "/images/eternityring.webp",   featured: true },
  { name: "Bespoke Design",      slug: "bespoke",            image: "/images/bespoke.webp",        featured: false },
  { name: "Jewellery",           slug: "jewellery",          image: "/images/jwelery.webp",        featured: false },
  { name: "Oval Shape",          slug: "oval-shape",         image: "/images/ovalshape.webp",      featured: false },
  { name: "Round Brilliant Cut", slug: "round-brilliant",    image: "/images/round.webp",          featured: false },
  { name: "Elongated Cushion",   slug: "elongated-cushion",  image: "/images/elongated.webp",      featured: false },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Connected to MongoDB");

  for (const cat of categories) {
    await Category.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, new: true }
    );
    console.log(`✓ ${cat.name}`);
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
