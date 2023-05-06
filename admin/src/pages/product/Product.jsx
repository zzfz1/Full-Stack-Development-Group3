import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlugAsync, editProductAsync, deleteProductAsync } from "../../redux/productSlice";
import { getCategoryByIdAsync, getAllCategoriesAsync } from "../../redux/categorySlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  const newObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
}

const Product = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const category = useSelector((state) => state.category.category);
  const allCategories = useSelector((state) => state.category.categories);

  const [editedProduct, setEditedProduct] = useState(product);
  const [selectedCategoryId, setSelectedCategoryId] = useState(product ? product.category : "");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchProductData();
    dispatch(getAllCategoriesAsync());
  }, []);

  const fetchProductData = async () => {
    dispatch(getAllCategoriesAsync());
    dispatch(getProductBySlugAsync(slug));
  };

  const setDefaultValues = async () => {
    await fetchProductData();
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    if (!product || product.slug !== slug) {
      dispatch(getProductBySlugAsync(slug));
    } else {
      setEditedProduct(product);
      setSelectedCategoryId(product.category);
      dispatch(getAllCategoriesAsync());
      dispatch(getCategoryByIdAsync(product.category));
    }
  }, [dispatch, slug, product]);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    if (categoryId) {
      const categoryExists = allCategories.some((cat) => cat._id === categoryId);
      if (!categoryExists) {
        return;
      }

      setEditedProduct({
        ...editedProduct,
        category: categoryId,
        properties: [],
      });
      setSelectedCategoryId(categoryId);
      await dispatch(getCategoryByIdAsync(categoryId));
    } else {
      setEditedProduct({ ...editedProduct, category: "", properties: [] });
      setSelectedCategoryId("");
    }
  };

  const handleProductChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleDeleteProduct = async (slug) => {
    try {
      await dispatch(deleteProductAsync(slug));
      navigate("/products"); // Redirect to the home page after deleting
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePropertyChange = (index, e) => {
    const newProperties = [...editedProduct.properties];
    const categoryPropertyId = e.target.value;

    // Check if the category property is already assigned to another property
    const existingPropertyIndex = newProperties.findIndex((p, i) => i !== index && p.categoryProperty === categoryPropertyId);
    if (existingPropertyIndex >= 0) {
      return;
    }

    // Assign the new category property to the property
    newProperties[index] = {
      ...newProperties[index],
      categoryProperty: categoryPropertyId,
    };
    setEditedProduct({ ...editedProduct, properties: newProperties });
  };

  const addProperty = () => {
    if (editedProduct.category) {
      // Check if all category properties are already assigned to the product
      const assignedCategoryProperties = editedProduct.properties.map((p) => p.categoryProperty);
      const remainingCategoryProperties = category.categoryProperties.filter((cp) => !assignedCategoryProperties.includes(cp._id));

      if (remainingCategoryProperties.length === 0) {
        return;
      }

      // Add a new property with the first remaining category property
      const newProperty = { categoryProperty: remainingCategoryProperties[0]._id, values: [] };
      setEditedProduct({ ...editedProduct, properties: [...editedProduct.properties, newProperty] });
    }
  };

  const removeProperty = (index) => {
    const newProperties = [...editedProduct.properties];
    newProperties.splice(index, 1);
    setEditedProduct({ ...editedProduct, properties: newProperties });
  };

  const addValue = (propertyIndex) => {
    const newProperties = deepCopy(editedProduct.properties);
    const hasEmptyValue = newProperties[propertyIndex].values.some((valueObj) => valueObj.value === "" && !valueObj._id);
    if (!hasEmptyValue) {
      const tempId = "temp-" + Date.now(); // Generate a temporary unique key
      newProperties[propertyIndex].values.push({ value: "", _id: tempId });
      setEditedProduct({ ...editedProduct, properties: newProperties });
    }
  };

  const removeValue = (propertyIndex, valueId) => {
    const newProperties = deepCopy(editedProduct.properties);
    newProperties[propertyIndex].values = newProperties[propertyIndex].values.filter((v) => v._id !== valueId);
    setEditedProduct({ ...editedProduct, properties: newProperties });
  };

  const handleValueChange = (propertyIndex, valueId, newValue) => {
    const newProperties = deepCopy(editedProduct.properties);
    newProperties[propertyIndex].values = newProperties[propertyIndex].values.map((valueObj) => (valueObj._id === valueId ? { ...valueObj, value: newValue } : valueObj));
    setEditedProduct({ ...editedProduct, properties: newProperties });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const productData = { ...editedProduct };

    // Filter out any properties with empty values
    const productData = { ...editedProduct };
    productData.properties = productData.properties.map((property) => {
      const newProperty = { ...property };
      newProperty.values = newProperty.values.filter((value) => value.value !== "");
      return newProperty;
    });
    // Remove temporary keys from the product properties
    productData.properties = productData.properties.map((property) => {
      const newProperty = { ...property };
      newProperty.values = newProperty.values.map((value) => {
        if (value._id && value._id.startsWith("temp-")) {
          const newValue = { ...value };
          delete newValue._id; // Remove temporary key
          return newValue;
        }
        return value;
      });
      return newProperty;
    });
    console.log("productData", productData);
    await dispatch(editProductAsync({ oldslug: product.slug, updatedProduct: productData }));
    setEditedProduct(productData);
    navigate("/products");
  };
  // console.log(category);
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "fixed",
        paddingRight: (theme) => theme.spacing(1),
      }}
    >
      <Container maxWidth="lg">
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" flexGrow={1}>
              Edit Product
            </Typography>
            <Button type="submit" variant="contained" color="primary" form="product-edit-form">
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={openDeleteDialog} style={{ marginRight: "8px" }}>
              Delete
            </Button>
            <Button variant="contained" onClick={setDefaultValues} style={{ marginRight: "8px" }}>
              Set to Default
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box
              mt={3}
              sx={{
                maxHeight: "calc(100vh - 190px)",
                overflowY: "auto",
              }}
            >
              {category && product && allCategories && editedProduct && editedProduct.category && (
                <form onSubmit={handleSubmit} id="product-edit-form">
                  <TextField label="Name" variant="outlined" name="name" value={editedProduct.name} onChange={handleProductChange} fullWidth margin="normal" />
                  <TextField label="Image" variant="outlined" name="image" value={editedProduct.image} onChange={handleProductChange} fullWidth margin="normal" />
                  <TextField label="Brand" variant="outlined" name="brand" value={editedProduct.brand} onChange={handleProductChange} fullWidth margin="normal" />
                  <TextField label="Price" variant="outlined" name="price" value={editedProduct.price} onChange={handleProductChange} fullWidth margin="normal" />
                  <TextField
                    label="Count in Stock"
                    variant="outlined"
                    name="countInStock"
                    value={editedProduct.countInStock}
                    onChange={handleProductChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField label="Description" variant="outlined" name="description" value={editedProduct.description} onChange={handleProductChange} fullWidth margin="normal" />
                  <TextField
                    label="Rating"
                    variant="outlined"
                    name="rating"
                    value={editedProduct.rating}
                    onChange={handleProductChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Number of Reviews"
                    variant="outlined"
                    name="numReviews"
                    value={editedProduct.numReviews}
                    onChange={handleProductChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    {/* <Select labelId="category-select-label" name="category" value={editedProduct.category} onChange={handleCategoryChange}> */}
                    <Select labelId="category-select-label" name="category" defaultValue="" value={selectedCategoryId || ""} onChange={handleCategoryChange}>
                      {allCategories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id || ""}>
                          {cat.name || ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {editedProduct.properties.map((property, index) => (
                    <div key={index}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`property-select-label-${index}`}>Property</InputLabel>
                        <Select
                          labelId={`property-select-label-${index}`}
                          name="categoryProperty"
                          defaultValue=""
                          value={property.categoryProperty || ""}
                          onChange={(e) => handlePropertyChange(index, e)}
                        >
                          {category && category.categoryProperties ? (
                            category.categoryProperties.map((categoryProperty) => (
                              <MenuItem key={categoryProperty._id} value={categoryProperty._id || ""}>
                                {categoryProperty.key || ""}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>{category ? "No properties assigned" : "No category selected"}</MenuItem>
                          )}
                        </Select>

                        <Button variant="outlined" color="error" onClick={() => removeProperty(index)}>
                          Remove Property
                        </Button>
                      </FormControl>
                      {property.categoryProperty && (
                        <div>
                          {property.values.map((valueObj) => (
                            <div key={valueObj._id} style={{ display: "flex", alignItems: "center" }}>
                              <TextField
                                label="Value"
                                variant="outlined"
                                name="values"
                                value={valueObj.value || ""}
                                onChange={(e) => handleValueChange(index, valueObj._id, e.target.value)}
                                margin="normal"
                              />
                              <IconButton onClick={() => removeValue(index, valueObj._id)} color="secondary">
                                <Remove />
                              </IconButton>
                            </div>
                          ))}
                          <IconButton onClick={() => addValue(index)} color="primary">
                            <Add />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button variant="outlined" color="success" onClick={addProperty}>
                    Add Property
                  </Button>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteProduct(editedProduct.slug);
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
