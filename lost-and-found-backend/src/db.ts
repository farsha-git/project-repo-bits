// src/db.ts  (Prisma 7 style)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // adapter: { provider: "postgresql", url: process.env.DATABASE_URL }
  // If Prisma 7 requires adapter object (check your Prisma docs / CLI messaging)
});

export default prisma;
