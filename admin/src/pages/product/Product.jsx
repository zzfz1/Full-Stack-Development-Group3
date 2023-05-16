import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlugAsync, editProductAsync, deleteProductAsync } from "../../redux/productSlice";
import { getCategoryBySlugAsync, getAllCategoriesAsync } from "../../redux/categorySlice";
import { Button, AppBar, Toolbar, Typography, Container, Grid, Box } from "@mui/material";
import ProductDialog from "./ProductDialog";
import ProductForm from "./ProductForm";
import { deepCopy } from "../utils/deepCopy";
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
  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
    dispatch(getAllCategoriesAsync());
    dispatch(getProductBySlugAsync(slug));
  };
  const setDefaultValues = async () => {
    await fetchProductData();
  };
  useEffect(() => {
    if (!product || product.slug !== slug) {
      dispatch(getProductBySlugAsync(slug));
    } else {
      setEditedProduct(product);
      setSelectedCategory(product.category.slug);
      dispatch(getAllCategoriesAsync());
      dispatch(getCategoryBySlugAsync(product.category.slug));
    }
  }, [dispatch, slug, product]);

  const handleProductChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = async (e) => {
    const categorySlug = e.target.value;
    if (categorySlug) {
      const categoryExists = allCategories.some((categoryItem) => categoryItem.slug === categorySlug);
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
  const handleDeleteProduct = async (slug) => {
    try {
      await dispatch(deleteProductAsync(slug));
      navigate("/products");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handlePropertyChange = (index, e) => {
    const newProperties = [...editedProduct.properties];
    const categoryPropertyId = e.target.value;
    const existingPropertyIndex = newProperties.findIndex((p, i) => i !== index && p.categoryProperty === categoryPropertyId);
    if (existingPropertyIndex >= 0) {
      return;
    }
    newProperties[index] = {
      ...newProperties[index],
      categoryProperty: categoryPropertyId,
    };
    setEditedProduct({ ...editedProduct, properties: newProperties });
  };
  const addProperty = () => {
    if (editedProduct.category) {
      const assignedCategoryProperties = editedProduct.properties.map((p) => p.categoryProperty);
      const remainingCategoryProperties = category.categoryProperties.filter((cp) => !assignedCategoryProperties.includes(cp._id));
      if (remainingCategoryProperties.length === 0) {
        return;
      }
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
    const productData = { ...editedProduct };
    productData.properties = productData.properties.map((property) => {
      const newProperty = { ...property };
      newProperty.values = newProperty.values.filter((value) => value.value !== "");
      return newProperty;
    });
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
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
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
                <ProductForm
                  handleSubmit={handleSubmit}
                  handleProductChange={handleProductChange}
                  handleCategoryChange={handleCategoryChange}
                  handlePropertyChange={handlePropertyChange}
                  addProperty={addProperty}
                  removeProperty={removeProperty}
                  addValue={addValue}
                  removeValue={removeValue}
                  handleValueChange={handleValueChange}
                  editedProduct={editedProduct}
                  allCategories={allCategories}
                  selectedCategory={selectedCategory}
                  category={category}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ProductDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={(slug) => handleDeleteProduct(slug)} slug={slug} />
    </Box>
  );
};
export default Product;
