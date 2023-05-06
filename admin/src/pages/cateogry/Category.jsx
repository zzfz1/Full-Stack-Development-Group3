import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryBySlugAsync, editCategoryAsync, deleteCategoryAsync } from "../../redux/categorySlice";
import { AppBar, Box, Button, TextField, Toolbar, Typography, IconButton, List, ListItem, ListItemText, Card, CardContent, Grid } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import slugify from "slugify";

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const Category = () => {
  const [localCategory, setLocalCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.category.status);
  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    if (status === "succeeded" && category) {
      setLocalCategory(category);
    }
  }, [status, category]);

  useEffect(() => {
    dispatch(getCategoryBySlugAsync(slug));
  }, [slug, dispatch]);

  const handleEditCategory = async (oldslug, updatedCategory) => {
    console.log("oldslugCategory: ", oldslug);
    try {
      await dispatch(editCategoryAsync({ oldslug, updatedCategory }));
      setLocalCategory(updatedCategory); // Update the local state
      // Navigate to the updated slug
      const newSlug = slugify(updatedCategory.name, { lower: true, strict: true });
      navigate(`/categories/${newSlug}`, { replace: true }); // Add the replace option here

      // Add this line to navigate to the categories page after saving
      navigate("/categories");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDeleteCategory = async (slug) => {
    try {
      await dispatch(deleteCategoryAsync(slug));
      navigate("/categories"); // Redirect to the home page after deleting
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const addNewAttribute = () => {
    const newProperty = { key: "" };
    setLocalCategory({
      ...localCategory,
      categoryProperties: [...localCategory.categoryProperties, newProperty],
    });
  };

  const removeAttribute = (index) => {
    const updatedProperties = deepCopy(localCategory.categoryProperties);
    updatedProperties.splice(index, 1);
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

  const renderCategoryProperties = () => {
    return (
      <>
        {localCategory?.categoryProperties?.map((property, index) => (
          <Box key={index} mt={3}>
            <TextField
              fullWidth
              label="Attribute Key"
              value={property.key}
              onChange={(e) => {
                const updatedProperties = deepCopy(localCategory.categoryProperties);
                updatedProperties[index].key = e.target.value;
                setLocalCategory({
                  ...localCategory,
                  categoryProperties: updatedProperties,
                });
              }}
            />
            <IconButton
              onClick={() => {
                removeAttribute(index);
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={addNewAttribute}>
            Add Attribute Key
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          {category ? (
            <>
              <Box mt={8}>
                <TextField id="category-name" label="Category Name" value={localCategory?.name || ""} onChange={(e) => setLocalCategory({ ...localCategory, name: e.target.value })} fullWidth />
                {renderCategoryProperties()}
                <Box mt={2}>...</Box>
              </Box>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
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
    </Box>
  );
};

export default Category;
