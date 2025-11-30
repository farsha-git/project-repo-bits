// src/pages/Profile.tsx
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import api from "../api/apiClient";
import type { Item } from "../types";

async function fetchMyItems() {
  // backend: GET /users/me/items or GET /items?reported_by=me
  const res = await api.get<{ items: Item[] }>(`/users/me/items`);
  return res.data.items;
}

export default function Profile() {
  const { data: items, isLoading, isError } = useQuery<Item[], Error>({ queryKey: ["my-items"], queryFn: fetchMyItems });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Reports
      </Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography color="error">Failed to load your items.</Typography>
      ) : Array.isArray(items) && items.length ? (
        <List>
          {items.map((it) => (
            <React.Fragment key={it.id}>
              <ListItem
                secondaryAction={
                  <Button href={`/items/${it.id}`} variant="outlined" size="small">
                    View
                  </Button>
                }
              >
                <ListItemText primary={it.title} secondary={`${it.status} • ${it.location_text ?? ""}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">You haven't reported any items yet.</Typography>
      )}
    </Container>
  );
}
