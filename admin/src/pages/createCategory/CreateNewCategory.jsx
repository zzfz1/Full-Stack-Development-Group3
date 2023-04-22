import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategoryAsync } from "../../redux/categorySlice";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";

const CreateCategory = () => {
  const [newCategory, setNewCategory] = useState({ name: "", allowedProperties: [] });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateCategory = async (category) => {
    try {
      await dispatch(createCategoryAsync(category));
      navigate("/categories");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Create Category
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleCreateCategory(newCategory)} style={{ marginRight: "8px" }}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={8}>
        <TextField id="category-name" label="Category Name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} fullWidth />
      </Box>
    </Box>
  );
};

export default CreateCategory;
