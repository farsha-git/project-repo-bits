// src/routes/upload.ts
import express from "express";
import { createPresignedUploadUrl } from "../services/s3";

const router = express.Router();

/**
 * GET /upload-url?key=images/abc.jpg&contentType=image/jpeg
 * Returns { url, key }
 */
router.get("/", async (req, res) => {
  try {
    const key = String(req.query.key || `uploads/${Date.now()}-${Math.random().toString(36).slice(2,8)}.jpg`);
    const contentType = String(req.query.contentType || "image/jpeg");
    const expires = parseInt(String(process.env.S3_UPLOAD_EXPIRATION || "900"), 10);

    const url = await createPresignedUploadUrl(key, contentType, expires);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating upload url" });
  }
});

export default router;
