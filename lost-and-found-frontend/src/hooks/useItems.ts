// src/hooks/useItems.ts
import { useQuery } from "@tanstack/react-query";
import api from "../api/apiClient";
import type { Item } from "../types";

async function fetchItems(status: "lost" | "found", page = 1, limit = 20) {
  // backend expected: GET /items?status=lost&page=1&limit=20
  const res = await api.get<{ items: Item[] }>(`/items`, {
    params: { status, page, limit },
  });
  return res.data.items;
}

// Hook to get items; React Query handles caching
export function useItems(status: "lost" | "found", page = 1, limit = 20) {
  return useQuery<Item[], Error>({
    queryKey: ["items", status, page, limit],
    queryFn: () => fetchItems(status, page, limit),
  });
}
