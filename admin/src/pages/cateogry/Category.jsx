import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryPropertyAsync, getCategoryPropertiesAsync, deleteCategoryPropertyAsync } from "../../redux/categoryPropertySlice";
import { getCategoryBySlugAsync, editCategoryAsync, deleteCategoryAsync, getAllCategoriesAsync } from "../../redux/categorySlice";
import { getAllProductsAsync } from "../../redux/productSlice";
import { AppBar, Box, Button, TextField, Toolbar, Typography, Grid, Container, Select, MenuItem } from "@mui/material";
import slugify from "slugify";
import Dialogs from "./CategoryDialog";
import { usePropertyLogic } from "./CategoryLogic";
const Category = () => {
  const [localCategory, setLocalCategory] = useState(null);
  const [newPropertyKey, setNewPropertyKey] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deletePropertyDialogOpen, setDeletePropertyDialogOpen] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.category.status);
  const category = useSelector((state) => state.category.category);
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const categoryProperties = useSelector((state) => state.categoryProperty.properties);
  const { selectedProperties, addNewPropertySelect, removeProperty, handlePropertySelect } = usePropertyLogic(localCategory, setLocalCategory, categoryProperties);
  useEffect(() => {
    dispatch(getCategoryBySlugAsync(slug));
    dispatch(getAllCategoriesAsync());
    dispatch(getAllProductsAsync());
  }, [slug, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && category) {
      setLocalCategory(category);
      dispatch(getCategoryPropertiesAsync());
    }
  }, [status, category]);
  const handleEditCategory = async (oldslug, updatedCategory) => {
    try {
      await dispatch(editCategoryAsync({ oldslug, updatedCategory }));
      setLocalCategory(updatedCategory);
      const newSlug = slugify(updatedCategory.name, { lower: true, strict: true });
      // navigate(`/categories/${newSlug}`, { replace: true }); // if I wanna change it to stay on the page
      navigate("/categories");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };
  const handleDeleteCategory = async (slug) => {
    try {
      const usedInProduct = products.find((product) => product.category.slug === slug);
      if (usedInProduct) {
        alert(`Category is used in ${usedInProduct.name}. Please remove it from there first`);
        return;
      }
      await dispatch(deleteCategoryAsync(slug));
      navigate("/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleDeleteProperty = async (propertyId) => {
    try {
      const usedInCategory = categories.find((category) => category.categoryProperties.some((property) => property._id === propertyId));
      if (usedInCategory) {
        alert(`Propety is used in ${usedInCategory.name}. Please remove it from there first`);
        return;
      }
      await dispatch(deleteCategoryPropertyAsync(propertyId));
      closeDeletePropertyDialog();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };
  const handleCreateProperty = async () => {
    if (newPropertyKey.trim() !== "") {
      const existingProperty = categoryProperties.find((property) => property.key === newPropertyKey);
      if (existingProperty) {
        alert("A property with this key already exists.");
        return;
      }
      await dispatch(createCategoryPropertyAsync({ key: newPropertyKey }));
      const newProperty = categoryProperties.find((property) => property.key === newPropertyKey);
      if (newProperty) {
        setSelectedProperties([...selectedProperties, newProperty._id]);
      }
      setNewPropertyKey("");
      closePropertyDialog();
    }
  };
  const resetToDefault = () => {
    setLocalCategory(category);
  };
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const openPropertyDialog = () => {
    setPropertyDialogOpen(true);
  };
  const closePropertyDialog = () => {
    setPropertyDialogOpen(false);
  };
  const openDeletePropertyDialog = () => {
    if (categoryProperties.length > 0) {
      setPropertyToDelete(categoryProperties[0]._id);
    }
    setDeletePropertyDialogOpen(true);
  };
  const closeDeletePropertyDialog = () => {
    setDeletePropertyDialogOpen(false);
  };
  const renderCategoryProperties = () => {
    return (
      <>
        {localCategory?.categoryProperties?.map((property, index) => (
          <Box key={property._id} mt={3}>
            <Select value={property._id} onChange={(e) => handlePropertySelect(e, index)} fullWidth>
              {categoryProperties.map((property) => (
                <MenuItem key={property._id} value={property._id}>
                  {property.key}
                </MenuItem>
              ))}
            </Select>
            <Button variant="outlined" color="error" onClick={() => removeProperty(index)}>
              Remove Property
            </Button>
          </Box>
        ))}
        <Box mt={2}>
          <Button variant="outlined" color="success" onClick={() => addNewPropertySelect(newPropertyKey)}>
            Add Property
          </Button>

          <Button variant="outlined" color="primary" onClick={openPropertyDialog}>
            Add New Property
          </Button>
          <Button variant="outlined" color="error" onClick={openDeletePropertyDialog}>
            Delete Property
          </Button>
        </Box>
      </>
    );
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
              Edit Category
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleEditCategory(slug, {
                  name: localCategory.name,
                  categoryProperties: localCategory.categoryProperties,
                })
              }
              style={{ marginRight: "8px" }}
            >
              Save
            </Button>{" "}
            <Button variant="contained" color="secondary" onClick={openDeleteDialog} style={{ marginRight: "8px" }}>
              Delete
            </Button>
            <Button variant="contained" onClick={resetToDefault} style={{ marginRight: "8px" }}>
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
              {category ? (
                <>
                  <TextField
                    id="category-name"
                    label="Category Name"
                    value={localCategory?.name || ""}
                    onChange={(e) => setLocalCategory({ ...localCategory, name: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  {renderCategoryProperties()}
                </>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
        <Dialogs
          propertyDialogOpen={propertyDialogOpen}
          closePropertyDialog={closePropertyDialog}
          newPropertyKey={newPropertyKey}
          setNewPropertyKey={setNewPropertyKey}
          handleCreateProperty={handleCreateProperty}
          deleteDialogOpen={deleteDialogOpen}
          closeDeleteDialog={closeDeleteDialog}
          handleDeleteCategory={handleDeleteCategory}
          localCategory={localCategory}
          deletePropertyDialogOpen={deletePropertyDialogOpen}
          closeDeletePropertyDialog={closeDeletePropertyDialog}
          handleDeleteProperty={handleDeleteProperty}
          propertyToDelete={propertyToDelete}
          setPropertyToDelete={setPropertyToDelete}
          categoryProperties={categoryProperties}
        />
      </Container>
    </Box>
  );
};
export default Category;
