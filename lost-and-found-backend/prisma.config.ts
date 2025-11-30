// prisma.config.ts
import { defineConfig } from "prisma";
import path from "path";

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  // supply the DATABASE_URL for Migrate / Prisma CLI
  // you can read from process.env
  // For local dev it usually uses process.env.DATABASE_URL
  databases: {
    default: {
      url: process.env.DATABASE_URL,
    },
  },
});
