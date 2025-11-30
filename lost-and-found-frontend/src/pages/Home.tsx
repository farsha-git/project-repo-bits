// src/pages/Home.tsx
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>
        Lost & Found
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Report lost items, update found items, and help people reunite with their belongings.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button component={RouterLink} to="/lost" variant="outlined">
          Browse Lost
        </Button>
        <Button component={RouterLink} to="/found" variant="outlined">
          Browse Found
        </Button>
        <Button component={RouterLink} to="/report" variant="contained">
          Report an Item
        </Button>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Tip: include clear photos and location details when reporting to improve matching.
        </Typography>
      </Box>
    </Container>
  );
}
