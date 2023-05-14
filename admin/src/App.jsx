// Import necessary components and hooks
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
// Import BrowserRouter, Route, and Routes from react-router-dom v6
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryList from "./pages/categoryList/CategoyList.jsx";
import Category from "./pages/cateogry/Category.jsx";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import OrderList from "./pages/orderList/OrderList";
import UserList from "./pages/UserList/UserList";
import UserAnalytics from "./pages/userAnalytics/UserAnalytics";
import SalesAnalyticsChart from "./pages/salesAnalytics/SalesAnalytics";

function App() {
  // Use useSelector to access the Redux store and check if the user is an admin
  const admin = useSelector((state) => state.user.currentUser);
  console.log("admin,", admin);

  const customTheme = createTheme({
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: (theme) => theme.palette.action.hover,
              textDecoration: "none",
              cursor: "pointer",
            },
          },
        },
      },
    },
  });

  if (admin == null || !admin.isAdmin) {
    return (
      // Use BrowserRouter (aliased as Router) to enable routing in the application
      <Router>
        {/* If the user is an admin, render the main application layout */}
        {/* // If the user is not an admin, only show the login page */}
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Catch-all route to redirect users to the login page */}
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <ThemeProvider theme={customTheme}>
        <Router>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Topbar />
            <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
              <Sidebar />
              <Box
                component="main"
                mt={9}
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                }}
              >
                <Routes>
                  {/* Define routes with the new syntax using the "element" prop */}
                  <Route path="/" element={<Home />} />
                  <Route path="/userAnalytics" element={<UserAnalytics />} />
                  <Route path="/salesAnalytics" element={<SalesAnalyticsChart />} />
                  <Route path="/categories" element={<CategoryList />} />
                  <Route path="/categories/:slug" element={<Category />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:slug" element={<Product />} />
                  <Route path="/orders" element={<OrderList />} />
                  <Route path="/users" element={<UserList />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
