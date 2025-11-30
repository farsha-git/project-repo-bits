// src/pages/ItemCard.tsx
import type { Item } from "../types";
import { Link } from "react-router-dom";

export default function ItemCard({ item }: { item: Item }) {
  // normalize backend fields (supports both snake_case and camelCase)
  const title = item.title ?? (item as any).name ?? "Untitled";
  const description = item.description ?? (item as any).desc ?? "";
  const photos = (item.photos ?? (item as any).photo_urls ?? (item as any).photoUrls) as string[] | undefined;
  const thumb = photos?.[0] ?? "/placeholder.png";
  const location = item.location_text ?? (item as any).locationText ?? (item as any).location ?? "—";
  const reportedRaw = item.reported_at ?? (item as any).reportedAt ?? (item as any).createdAt ?? null;
  const reported = reportedRaw ? new Date(reportedRaw) : null;
  const reportedLabel = reported && !isNaN(reported.getTime()) ? reported.toLocaleDateString() : "—";

  return (
    <article className="bg-white rounded shadow p-3">
      <Link to={`/items/${item.id}`}>
        <img src={thumb} alt={title} className="h-40 w-full object-cover rounded" />
        <h3 className="mt-2 font-medium">{title}</h3>
        <p className="text-sm text-gray-600 truncate">{description}</p>
        <div className="text-xs text-gray-500 mt-2">
          {location} • {reportedLabel}
        </div>
      </Link>
    </article>
  );
}
