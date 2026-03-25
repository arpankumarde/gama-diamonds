import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const folder = file.mimetype.startsWith("video/") ? "videos" : "images";
    cb(null, path.join(uploadsDir, folder));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"));
    }
  },
});

const router = express.Router();

router.post("/", authenticate, authorize("admin", "superadmin"), upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: "No file uploaded" });
    return;
  }
  const folder = req.file.mimetype.startsWith("video/") ? "videos" : "images";
  const url = `/uploads/${folder}/${req.file.filename}`;
  res.status(201).json({ success: true, url });
});

export default router;
