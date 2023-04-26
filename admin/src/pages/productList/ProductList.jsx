// src/components/ProductList.jsx
import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const ProductList = ({ onEditProduct, onDeleteProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // for testing set an admin token here
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM4MDI3MTBjOTllZjVjNDhhNTZmNTUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODE4MTEwOTcsImV4cCI6MTY4NDQwMzA5N30.PGUAYNdvZEawCVTP8bVXzJ9gOpgjM4lkUiOkzziAokU";
    localStorage.setItem("authToken", token);

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("http://localhost:3000/api/products", config);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <List>
      {products.map((product) => (
        <ListItem key={product._id}>
          <ListItemText primary={product.name} secondary={product.brand} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onEditProduct(product)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={() => onDeleteProduct(product._id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
