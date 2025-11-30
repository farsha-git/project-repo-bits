// src/index.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import itemsRouter from "./routes/items";
import uploadRouter from "./routes/upload";
import prisma from "./db";
import path from "path";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));

// Health
app.get("/health", (req, res) => res.json({ ok: true }));

// Items routes
app.use("/api/items", itemsRouter);

// Upload route
app.use("/api/upload-url", uploadRouter);

// Backwards-compat: frontend expects GET /users/me/items
app.get("/users/me/items", async (req, res) => {
  // Use header x-user-id for now
  const userId = req.header("x-user-id") || req.query.userId;
  if (!userId) return res.json({ items: [] });
  const items = await prisma.item.findMany({ where: { reportedById: String(userId) }, orderBy: { reportedAt: "desc" } });
  res.json({ items });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
