import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LineStyle, Timeline, TrendingUp, Storefront, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, WorkOutline, Report } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <Box sx={{ width: 240 }}>
      <Box>
        <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Dashboard
        </Typography>
        <List>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItemButton selected>
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
            <ListItemButton>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemIcon>
                <Storefront />
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
              <DynamicFeed />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}
