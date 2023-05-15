import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryPropertyAsync, getCategoryPropertiesAsync, deleteCategoryPropertyAsync } from "../../redux/categoryPropertySlice";
import { getCategoryBySlugAsync, editCategoryAsync, deleteCategoryAsync } from "../../redux/categorySlice";
import { AppBar, Box, Button, TextField, Toolbar, Typography, Grid, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from "@mui/material";
import slugify from "slugify";

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const Category = () => {
  const [localCategory, setLocalCategory] = useState(null);
  const [newPropertyKey, setNewPropertyKey] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deletePropertyDialogOpen, setDeletePropertyDialogOpen] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.category.status);
  const category = useSelector((state) => state.category.category);
  const categoryProperties = useSelector((state) => state.categoryProperty.properties);

  useEffect(() => {
    dispatch(getCategoryBySlugAsync(slug)); //get category with populated categoryproperties
  }, [slug, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && category) {
      setLocalCategory(category);
      dispatch(getCategoryPropertiesAsync());
    }
  }, [status, category]);

  useEffect(() => {
    if (localCategory && localCategory.categoryProperties) {
      setSelectedProperties(localCategory.categoryProperties.map((property) => property._id));
    }
  }, [localCategory]);

  const handleEditCategory = async (oldslug, updatedCategory) => {
    try {
      await dispatch(editCategoryAsync({ oldslug, updatedCategory }));
      setLocalCategory(updatedCategory);
      const newSlug = slugify(updatedCategory.name, { lower: true, strict: true });
      navigate(`/categories/${newSlug}`, { replace: true });
      navigate("/categories");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDeleteCategory = async (slug) => {
    try {
      await dispatch(deleteCategoryAsync(slug));
      navigate("/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const addNewPropertySelect = () => {
    const newProperty = categoryProperties.find((property) => !selectedProperties.includes(property._id));
    if (newProperty) {
      setLocalCategory({
        ...localCategory,
        categoryProperties: [...localCategory.categoryProperties, newProperty],
      });
      setSelectedProperties([...selectedProperties, newProperty._id]);
    }
  };

  const removeProperty = (index) => {
    const updatedProperties = deepCopy(localCategory.categoryProperties);
    const removedProperty = updatedProperties.splice(index, 1);
    console.log("removedIndex: ", index);
    console.log("removedProperty: ", removedProperty);
    // Update selectedProperties state
    setSelectedProperties(selectedProperties.filter((id) => id !== removedProperty[0]._id));

    setLocalCategory({
      ...localCategory,
      categoryProperties: updatedProperties,
    });
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

  const handleCreateProperty = async () => {
    if (newPropertyKey.trim() !== "") {
      // Check if property already exists
      const existingProperty = categoryProperties.find((property) => property.key === newPropertyKey);

      if (existingProperty) {
        // If property already exists, alert user and return
        alert("A property with this key already exists.");
        return;
      }

      // If property does not exist, create it
      await dispatch(createCategoryPropertyAsync({ key: newPropertyKey }));

      const newProperty = categoryProperties.find((property) => property.key === newPropertyKey);
      if (newProperty) {
        setSelectedProperties([...selectedProperties, newProperty._id]);
      }

      setNewPropertyKey("");
      closePropertyDialog();
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await dispatch(deleteCategoryPropertyAsync(propertyId));
      closeDeletePropertyDialog();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
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

  const handlePropertySelect = (e, index) => {
    const updatedProperties = deepCopy(localCategory.categoryProperties);
    const selectedProperty = categoryProperties.find((prop) => prop._id === e.target.value);

    // Update selectedProperties state
    setSelectedProperties([...selectedProperties, selectedProperty._id]);

    updatedProperties[index] = selectedProperty;
    setLocalCategory({
      ...localCategory,
      categoryProperties: updatedProperties,
    });
  };

  const renderCategoryProperties = () => {
    console.log("localCategory: ", localCategory);
    console.log("categoryProperties", categoryProperties);

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
        <Dialog open={propertyDialogOpen} onClose={closePropertyDialog}>
          <DialogTitle>Create New Property</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Property Key" type="text" fullWidth value={newPropertyKey} onChange={(e) => setNewPropertyKey(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closePropertyDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateProperty} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
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
        <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this category? This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeleteCategory(localCategory.slug);
                closeDeleteDialog();
              }}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deletePropertyDialogOpen} onClose={closeDeletePropertyDialog}>
          <DialogTitle>Delete Property</DialogTitle>
          <DialogContent>
            <DialogContentText>Select a property to delete.</DialogContentText>
            <Select value={propertyToDelete} onChange={(e) => setPropertyToDelete(e.target.value)} fullWidth>
              {categoryProperties.map((property) => (
                <MenuItem key={property._id} value={property._id}>
                  {property.key}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeletePropertyDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDeleteProperty(propertyToDelete)} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
export default Category;
