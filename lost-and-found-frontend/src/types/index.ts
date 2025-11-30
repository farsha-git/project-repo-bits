// src/types/index.ts
export type ItemStatus = "lost" | "found" | "claimed" | "resolved";

export interface Item {
  id: string;
  title: string;
  description?: string;
  category?: string;
  status: ItemStatus;
  location_text?: string;
  lat?: number | null;
  lng?: number | null;
  photos?: string[]; // URLs
  reported_at: string; // ISO
  contact_info?: string;
  reported_by?: string; // user id or name
}
