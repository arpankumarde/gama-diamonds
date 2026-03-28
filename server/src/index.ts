import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectToDatabase from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

config();

const app = express();
const port = process.env.PORT || 5001;
// CORS should be before helmet
const isProd = process.env.NODE_ENV === "production";
app.use(cors({
  origin: isProd ? process.env.CLIENT_URL : true,
  credentials: true,
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Disable rate limiting in development
if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests, please try again later" }
  });
  app.use(limiter);
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Static uploads removed — files are now served from Cloudinary
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Server healthy!" });
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Backend is running", timestamp: new Date() });
});

connectToDatabase().then(() => {
  const server = app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
});
