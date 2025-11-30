// src/controllers/itemsController.ts
import { Request, Response } from "express";
import prisma from "../db";
import { validationResult } from "express-validator";

/**
 * GET /items?status=lost&page=1&limit=20
 */
export async function listItems(req: Request, res: Response) {
  try {
    const status = (req.query.status as string) || undefined;
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "20");
    const where: any = {};
    if (status) where.status = status;

    const items = await prisma.item.findMany({
      where,
      orderBy: { reportedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * GET /items/:id
 */
export async function getItem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * POST /items
 * Body: { title, description, status, location_text, photos, contact_info, reported_by }
 */
export async function createItem(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      title,
      description,
      status,
      location_text,
      photos = [],
      contact_info,
      reported_by,
      lat,
      lng,
    } = req.body;

    // If reported_by provided, try connecting to user; otherwise null
    let reportedById = undefined;
    if (reported_by) {
      // either an existing user id or create a lightweight user record
      const existing = await prisma.user.findUnique({ where: { id: reported_by } }).catch(() => null);
      if (existing) reportedById = existing.id;
      else {
        // create a basic user with provided id as email or name fallback (this is optional behavior)
        const u = await prisma.user.create({ data: { name: reported_by.toString() } });
        reportedById = u.id;
      }
    }

    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        category: req.body.category,
        status,
        locationText: location_text,
        lat: lat ? Number(lat) : undefined,
        lng: lng ? Number(lng) : undefined,
        photos,
        contactInfo: contact_info,
        reportedAt: new Date(),
        reportedById,
      },
    });

    res.status(201).json({ item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * GET /users/me/items
 * NOTE: no auth in this simple example; uses `reported_by` query header or param if provided
 */
export async function getMyItems(req: Request, res: Response) {
  try {
    // In real app: replace with authenticated user id
    const userId = req.header("x-user-id") || req.query.userId;
    if (!userId) return res.json({ items: [] });

    const items = await prisma.item.findMany({
      where: { reportedById: String(userId) },
      orderBy: { reportedAt: "desc" },
    });

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
