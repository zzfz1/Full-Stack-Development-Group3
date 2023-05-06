import React from "react";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <NotificationsNone />
          </IconButton>
          <IconButton color="inherit">
            <Language />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
