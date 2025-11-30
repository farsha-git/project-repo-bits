// src/pages/ItemDetail.tsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useItem } from "../hooks/useItem";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, isError } = useItem(id);

  if (isLoading)
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (isError)
    return (
      <Container sx={{ py: 6 }}>
        <Typography color="error">Failed to load item.</Typography>
      </Container>
    );

  if (!item)
    return (
      <Container sx={{ py: 6 }}>
        <Typography>No item found.</Typography>
      </Container>
    );

  // Normalize fields to support both snake_case and camelCase responses
  const normalized = {
    id: item.id,
    title: item.title ?? (item as any).name ?? "Untitled",
    description: item.description ?? (item as any).desc ?? "",
    photos: (item.photos ?? (item as any).photo_urls ?? (item as any).photoUrls) as string[] | undefined,
    status: (item.status ?? (item as any).state ?? "unknown").toString(),
    locationText: item.location_text ?? (item as any).locationText ?? (item as any).location ?? "—",
    contactInfo: item.contact_info ?? (item as any).contactInfo ?? null,
    reportedAtRaw: item.reported_at ?? (item as any).reportedAt ?? (item as any).createdAt ?? null,
  };

  const reportedAt = normalized.reportedAtRaw ? new Date(normalized.reportedAtRaw) : null;
  const reportedLabel = reportedAt && !isNaN(reportedAt.getTime()) ? reportedAt.toLocaleString() : "—";

  return (
    <Container sx={{ py: 4 }}>
      {/* Back button */}
      <Button
        component={RouterLink}
        to={normalized.status === "lost" ? "/lost" : "/found"}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        {normalized.title}
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT: image(s) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            {normalized.photos && normalized.photos.length > 0 ? (
              normalized.photos.map((p) => (
                <Box
                  key={p}
                  component="img"
                  src={p}
                  alt={normalized.title}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    mb: 2,
                    objectFit: "cover",
                  }}
                />
              ))
            ) : (
              <Box
                component="img"
                src="/placeholder.png"
                alt="No photo"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            )}
          </Paper>
        </Grid>

        {/* RIGHT: details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              {normalized.description || "No description available."}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">
              <strong>Status:</strong> {normalized.status.toUpperCase()}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Location:</strong> {normalized.locationText || "—"}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Reported on:</strong> {reportedLabel}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {normalized.contactInfo ? (
              <Button
                variant="contained"
                color="primary"
                href={`mailto:${normalized.contactInfo}`}
              >
                Contact Reporter
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No contact information provided.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
