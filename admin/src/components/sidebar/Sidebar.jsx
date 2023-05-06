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
            <ListItemText primary="Analytics" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItemButton>
        </List>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Quick Menu
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
          <ListItemButton>
            <ListItemIcon>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </List>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Notifications
        </Typography>
        <List>
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
            <ListItemText primary="Feedback" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ChatBubbleOutline />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </List>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Staff
        </Typography>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <WorkOutline />
            </ListItemIcon>
            <ListItemText primary="Manage" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Report />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}
