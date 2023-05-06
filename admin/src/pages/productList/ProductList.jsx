import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProductsAsync, createProductAsync } from "../../redux/productSlice";
import { getAllCategoriesAsync } from "../../redux/categorySlice"; // Import getAllCategoriesAsync from the correct file
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { TextField, FormHelperText, Box, Button, Card, CardHeader, CardContent, Typography, Grid, CardActions, IconButton, AppBar, Toolbar } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const ProductList = () => {
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.category.categories);

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productNameError, setProductNameError] = useState("");

  const [productName, setProductName] = useState("");

  useEffect(() => {
    dispatch(getAllProductsAsync());
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);
  const handleCreateProduct = async () => {
    if (!selectedCategory || !productName) return;

    const existingProduct = products.find((product) => product.name === productName);

    if (existingProduct) {
      setProductNameError("Product with the same name and category already exists.");
      return;
    }

    try {
      const blankData = {
        name: productName,
        image: "",
        brand: "",
        category: selectedCategory,
        description: "",
        properties: [],
        price: 0,
        countInStock: 0,
      };
      dispatch(createProductAsync(blankData));
      setProductNameError("");
      setOpenCategoryDialog(false);
    } catch (error) {
      console.error("Error creating empty product:", error);
    }
  };

  const handleCategoryDialogClose = () => {
    setProductNameError("");
    setOpenCategoryDialog(false);
  };

  const handleCategoryDialogOpen = () => {
    setOpenCategoryDialog(true);
  };
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
    console.log("setSelectedCategory", event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Product List
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCategoryDialogOpen}>
            Create New Product
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box mt={8}>
            {status === "loading" ? (
              <Typography>Loading...</Typography>
            ) : (
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} md={12} key={product._id}>
                    <Card>
                      <CardHeader title={product.name} />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {/* You can add any additional details about the product here */}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton color="primary" component={Link} to={`/products/${product.slug}`}>
                          <EditIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openCategoryDialog} onClose={handleCategoryDialogClose} aria-labelledby="select-category-dialog-title">
        <DialogTitle id="select-category-dialog-title">Select Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Select a category for the new product:</DialogContentText>
          <DialogContentText>Enter the product name and select a category for the new product:</DialogContentText>
          <TextField autoFocus margin="dense" id="product-name" label="Product Name" type="text" fullWidth value={productName} onChange={handleProductNameChange} error={!!productNameError} />
          {productNameError && <FormHelperText error>{productNameError}</FormHelperText>}

          <FormControl fullWidth>
            <InputLabel htmlFor="select-category">Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategorySelect}
              inputProps={{
                name: "category",
                id: "select-category",
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCategoryDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateProduct} color="primary" disabled={!selectedCategory || !productName}>
            Create Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
