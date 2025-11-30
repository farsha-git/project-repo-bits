// src/routes/items.ts
import express from "express";
import { listItems, getItem, createItem, getMyItems } from "../controllers/itemsController";
import { createItemValidators } from "../utils/validate";

const router = express.Router();

// specific routes first
router.get("/users/me/items", getMyItems);

// collection
router.get("/", listItems);
router.post("/", createItemValidators, createItem);

// param route last
router.get("/:id", getItem);

export default router;
