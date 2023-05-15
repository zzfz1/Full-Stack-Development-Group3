import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlugAsync, editProductAsync, deleteProductAsync } from "../../redux/productSlice";
import { getCategoryBySlugAsync, getAllCategoriesAsync } from "../../redux/categorySlice";
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
  const [selectedCategory, setSelectedCategory] = useState(product && product.category ? product.category._id : "");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 1. Use Effect
  useEffect(() => {
    fetchProductData();
    // dispatch(getAllCategoriesAsync());
  }, []);

  const fetchProductData = async () => {
    dispatch(getAllCategoriesAsync()); //?? fetch product data?
    dispatch(getProductBySlugAsync(slug));
  };

  // SET TO DEFAULT
  const setDefaultValues = async () => {
    await fetchProductData();
  };

  // 2. Use Effect
  useEffect(() => {
    if (!product || product.slug !== slug) {
      dispatch(getProductBySlugAsync(slug));
    } else {
      setEditedProduct(product);
      setSelectedCategory(product.category.slug); // assuming category is populated and has _id field
      dispatch(getAllCategoriesAsync());
      dispatch(getCategoryBySlugAsync(product.category.slug));
    }
    console.log("useEffect-product", product);
    console.log("useEffect-editedProduct", editedProduct);
    console.log("useEffect-selectedCategory", selectedCategory);
    console.log("useEffect-allCategories", allCategories);
    console.log("useEffect-category", category);
  }, [dispatch, slug, product]);

  // PRODUCT
  const handleProductChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  // CATEGORY
  const handleCategoryChange = async (e) => {
    const categorySlug = e.target.value;

    if (categorySlug) {
      const categoryExists = allCategories.some((categoryItem) => categoryItem._id === categorySlug);
      if (!categoryExists) {
        return;
      }

      setEditedProduct({
        ...editedProduct,
        category: allCategories.find((categoryItem) => categoryItem.slug === categorySlug),
        properties: [],
      });

      setSelectedCategory(categorySlug);
      await dispatch(getCategoryBySlugAsync(categorySlug)); //set category with selected category slug
    } else {
      setEditedProduct({ ...editedProduct, category: null, properties: [] });
      setSelectedCategory(null);
    }
  };

  // PROPERTY
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

  // VALUE
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

  // SUBMIT
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

  // DIALOG FUNCTIONS
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  console.log("edited Product: ", editedProduct);
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
              {product && allCategories && editedProduct && editedProduct.properties && (
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
                    // InputProps={{
                    //   readOnly: true,
                    // }}
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
                    <Select labelId="category-select-label" name="category" defaultValue="" value={selectedCategory || ""} onChange={handleCategoryChange}>
                      <MenuItem value="">None</MenuItem>
                      {allCategories.map((categoryItem) => (
                        <MenuItem key={categoryItem.slug} value={categoryItem.slug || ""}>
                          {categoryItem.name || ""}
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
                          value={property.categoryProperty ? property.categoryProperty._id : ""}
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
