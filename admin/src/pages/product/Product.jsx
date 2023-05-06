// src/components/Product.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlugAsync, editProductAsync, deleteProductAsync } from "../../redux/productSlice";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import slugify from "slugify";

const Product = () => {
  const [localProduct, setLocalProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status);
  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    if (status === "succeeded" && product) {
      setLocalProduct(product);
    }
  }, [status, product]);

  useEffect(() => {
    dispatch(fetchProductBySlugAsync(slug));
  }, [slug, dispatch]);

  const handleEditProduct = async (oldslug, updatedProduct) => {
    try {
      await dispatch(editProductAsync({ oldslug, updatedProduct }));
      setLocalProduct(updatedProduct);
      const newSlug = slugify(updatedProduct.name, { lower: true, strict: true });
      navigate(`/products/${newSlug}`, { replace: true });
      navigate("/products");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (slug) => {
    try {
      await dispatch(deleteProductAsync(slug));
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Edit Product
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleEditProduct(slug, {
                name: localProduct.name,
              })
            }
            style={{ marginRight: "8px" }}
          >
            Save
          </Button>

          <Button variant="contained" color="secondary" onClick={openDeleteDialog} style={{ marginRight: "8px" }}>
            Delete
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={8}>
        {product ? (
          <TextField id="product-name" label="Product Name" value={localProduct?.name || ""} onChange={(e) => setLocalProduct({ ...localProduct, name: e.target.value })} fullWidth />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteProduct(localProduct.slug);
              closeDeleteDialog();
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
