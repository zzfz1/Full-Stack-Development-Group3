import React from "react";
import { NotificationsNone, Language, Settings, ExitToApp } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { openDrawer, closeDrawer } from "../../redux/drawerSlice";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.drawer.isOpen);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      localStorage.removeItem("currentUser");
      navigate("/login");
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton onClick={() => dispatch(isOpen ? closeDrawer() : openDrawer())}>
          <MenuIcon fontSize="large" sx={{ color: "#ffffff" }} />
        </IconButton>
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
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
