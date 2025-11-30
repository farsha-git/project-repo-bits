import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: "inherit", textDecoration: "none" }}>
          Lost & Found
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={RouterLink} to="/lost">Lost</Button>
          <Button color="inherit" component={RouterLink} to="/found">Found</Button>
          <Button variant="contained" color="secondary" component={RouterLink} to="/report">Report</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
