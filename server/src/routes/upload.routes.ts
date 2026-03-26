import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

let configured = false;

const upload = multer({
  storage: multer.memoryStorage(),
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

router.post("/", authenticate, authorize("admin", "superadmin"), upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: "No file uploaded" });
    return;
  }

  try {
    if (!configured) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      });
      configured = true;
    }

    const isVideo = req.file.mimetype.startsWith("video/");
    const base = process.env.ASSET_BASE || "gama";
    const subfolder = isVideo ? "videos" : "images";
    const folder = `${base}/${subfolder}`;

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: isVideo ? "video" : "image",
        },
        (error, result) => {
          if (error || !result) reject(error || new Error("Upload failed"));
          else resolve(result);
        }
      );
      stream.end(req.file!.buffer);
    });

    res.status(201).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload file" });
  }
});

export default router;
