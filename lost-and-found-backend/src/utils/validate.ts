// src/utils/validate.ts
import { body } from "express-validator";

export const createItemValidators = [
  body("title").isString().isLength({ min: 2 }),
  body("status").isIn(["lost", "found", "claimed", "resolved"]),
  body("description").optional().isString(),
  body("location_text").optional().isString(),
  body("photos").optional().isArray(),
  body("contact_info").optional().isString(),
];
