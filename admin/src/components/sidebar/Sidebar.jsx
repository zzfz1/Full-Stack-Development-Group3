import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingBag, Category, LineStyle, Timeline, TrendingUp, AttachMoney, MailOutline, ChatBubbleOutline, WorkOutline, PeopleAlt } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { openDrawer, closeDrawer } from "../../redux/drawerSlice";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isSelected = (path) => location.pathname === path;
  const isOpen = useSelector((state) => state.drawer.isOpen);

  const handleItemClick = (path) => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer open={isOpen} onClose={() => dispatch(closeDrawer())}>
      <Box sx={{ width: 240 }} mt={7}>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
            Dashboard
          </Typography>
          <List>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemButton selected={isSelected("/home")} onClick={handleItemClick}>
                <ListItemIcon>
                  <LineStyle />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            <Link to="/userAnalytics" style={{ textDecoration: "none" }}>
            <ListItemButton selected={isSelected("/userAnalytics")} onClick={handleItemClick}>
              <ListItemIcon>
                <Timeline />
              </ListItemIcon>
              <ListItemText primary="User Analytics" />
            </ListItemButton>
            </Link>
            <Link to="/salesAnalytics" style={{ textDecoration: "none" }}>
            <ListItemButton selected={isSelected("/salesAnalytics")} onClick={handleItemClick}>
              <ListItemIcon>
                <TrendingUp />
              </ListItemIcon>
              <ListItemText primary="Sales Analytics" />
            </ListItemButton>
            </Link>
          </List>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
            Main Menus
          </Typography>
          <List>
            <Link to="/categories" style={{ textDecoration: "none" }} onClick={handleItemClick}>
              <ListItemButton selected={isSelected("/categories")}>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }} onClick={handleItemClick}>
              <ListItemButton selected={isSelected("/products")}>
                <ListItemIcon>
                  <ShoppingBag />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </Link>
            <Link to="/orders" style={{ textDecoration: "none" }} onClick={handleItemClick}>
              <ListItemButton selected={isSelected("/orders")}>
                <ListItemIcon>
                  <WorkOutline />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </Link>
            <Link to="/users" style={{ textDecoration: "none" }} onClick={handleItemClick}>
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
