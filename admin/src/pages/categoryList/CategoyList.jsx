// src/components/CategoryList.jsx

import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const CategoryList = ({ onEditCategory, onDeleteCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // for testing set a admin token here
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
      const response = await axios.get("http://localhost:3000/api/categories", config);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <List>
      {categories.map((category) => (
        <ListItem key={category._id}>
          <ListItemText primary={category.name} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onEditCategory(category)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={() => onDeleteCategory(category._id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
