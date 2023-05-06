import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProductAsync } from "../../redux/productSlice";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";

const CreateNewProduct = () => {
  const [newProduct, setNewProduct] = useState({ name: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateProduct = async (product) => {
    try {
      await dispatch(createProductAsync(product));
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Create Product
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleCreateProduct(newProduct)} style={{ marginRight: "8px" }}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={8}>
        <TextField id="product-name" label="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} fullWidth />
      </Box>
    </Box>
  );
};

export default CreateNewProduct;
