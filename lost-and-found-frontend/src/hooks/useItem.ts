// src/hooks/useItem.ts
import { useQuery } from "@tanstack/react-query";
import api from "../api/apiClient";
import type { Item } from "../types";
async function fetchItemById(id: string) {
  const res = await api.get<{ item: Item }>(`/items/${id}`);
  return res.data.item;
}

export function useItem(id?: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemById(id!),
    enabled: !!id,
  });
}
