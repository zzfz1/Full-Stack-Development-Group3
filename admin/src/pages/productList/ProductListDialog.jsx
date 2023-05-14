import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText, Button } from "@mui/material";

const ProductDialog = ({ open, handleClose, handleCreateProduct, categories, selectedCategory, handleCategorySelect, productName, handleProductNameChange, productNameError }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="select-category-dialog-title">
      <DialogTitle id="select-category-dialog-title">Select Category</DialogTitle>
      <DialogContent>
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
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateProduct} color="primary" disabled={!selectedCategory || !productName}>
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
