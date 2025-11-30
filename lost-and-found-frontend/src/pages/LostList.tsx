// src/pages/LostList.tsx
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useItems } from "../hooks/useItems";
import { Link as RouterLink } from "react-router-dom";
import type { Item } from "../types";

function ItemCard({ item }: { item: Item }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={item.photos?.[0] ?? "/placeholder.png"}
        alt={item.title}
      />
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {item.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {item.location_text} • {new Date(item.reported_at).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/items/${item.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default function LostList() {
  const { data: items, isLoading, isError } = useItems("lost");

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lost Things
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">Failed to load items. Try again later.</Typography>
      ) : (
        <Grid container spacing={3}>
          {items && items.length > 0 ? (
            items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <ItemCard item={item} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              No lost items reported yet.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
}
