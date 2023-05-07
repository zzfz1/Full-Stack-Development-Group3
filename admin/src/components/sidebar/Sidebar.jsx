import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Category,
  LineStyle,
  Timeline,
  TrendingUp,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  PeopleAlt,
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isSelected = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          top: "auto",
          position: "fixed",
        },
      }}
    >
      <Box sx={{ width: 240 }} mt={7}>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
            Dashboard
          </Typography>
          <List>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemButton selected={isSelected("/")}>
                <ListItemIcon>
                  <LineStyle />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            <ListItemButton>
              <ListItemIcon>
                <Timeline />
              </ListItemIcon>
              <ListItemText primary="User Analytics" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <TrendingUp />
              </ListItemIcon>
              <ListItemText primary="Sales Analytics" />
            </ListItemButton>
          </List>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
            Main Menus
          </Typography>
          <List>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <ListItemButton selected={isSelected("/categories")}>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <ListItemButton selected={isSelected("/products")}>
                <ListItemIcon>
                  <ShoppingBag />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </Link>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <ListItemButton selected={isSelected("/orders")}>
                <ListItemIcon>
                  <WorkOutline />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </Link>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <ListItemButton selected={isSelected("/users")}>
                <ListItemIcon>
                  <PeopleAlt />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>
          </List>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
            Other Menus
          </Typography>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ChatBubbleOutline />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
