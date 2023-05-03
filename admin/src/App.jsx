// Import necessary components and hooks
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
// Import BrowserRouter, Route, and Routes from react-router-dom v6
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryList from "./pages/categoryList/CategoyList.jsx";
import Category from "./pages/cateogry/Category.jsx";
import NewCategory from "./pages/newCategory/newCategory.jsx";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
// import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  // Use useSelector to access the Redux store and check if the user is an admin
  const admin = useSelector((state) => state.user.currentUser);
  console.log('admin,', admin)

  return (
    // Use BrowserRouter (aliased as Router) to enable routing in the application
    <Router>
      {/* If the user is an admin, render the main application layout */}
      {admin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            {/* Use Routes component from react-router-dom v6 to define the available routes */}
            <Routes>
              {/* Define routes with the new syntax using the "element" prop */}
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/:slug" element={<Category />} />
              <Route path="/newcategory" element={<NewCategory />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
            </Routes>
          </div>
        </>
      ) : (
        // If the user is not an admin, only show the login page
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Catch-all route to redirect users to the login page */}
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );



}

export default App;
