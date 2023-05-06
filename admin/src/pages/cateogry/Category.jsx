import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryBySlugAsync, editCategoryAsync, deleteCategoryAsync } from "../../redux/categorySlice";
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
    dispatch(fetchCategoryBySlugAsync(slug));
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
    const newProperty = { key: "", allowedValues: [""] };
    setLocalCategory({
      ...localCategory,
      allowedProperties: [...localCategory.allowedProperties, newProperty],
    });
  };

  // das brauche ich doch....

  const resetToDefault = () => {
    setLocalCategory(category);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const renderAllowedProperties = () => {
    return (
      <>
        {localCategory?.allowedProperties?.map((property, index) => (
          <Box key={index} mt={3}>
            {/* <Typography variant="h6">{"Category Attribute " + (index + 1)}</Typography> */}
            <TextField
              fullWidth
              label="Attribute Key"
              value={property.key}
              onChange={(e) => {
                const updatedProperties = deepCopy(localCategory.allowedProperties);
                updatedProperties[index].key = e.target.value;
                setLocalCategory({
                  ...localCategory,
                  allowedProperties: updatedProperties,
                });
              }}
            />
            <List>
              {property.allowedValues.map((allowedValue, valueIndex) => (
                <ListItem key={valueIndex}>
                  <ListItemText>
                    <TextField
                      fullWidth
                      label="Allowed Value"
                      value={allowedValue}
                      onChange={(e) => {
                        const updatedProperties = deepCopy(localCategory.allowedProperties);
                        updatedProperties[index].allowedValues[valueIndex] = e.target.value;
                        setLocalCategory({
                          ...localCategory,
                          allowedProperties: updatedProperties,
                        });
                      }}
                    />
                  </ListItemText>
                  <IconButton
                    onClick={() => {
                      const updatedProperties = deepCopy(localCategory.allowedProperties);
                      updatedProperties[index].allowedValues.splice(valueIndex, 1);
                      setLocalCategory({
                        ...localCategory,
                        allowedProperties: updatedProperties,
                      });
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <IconButton
              onClick={() => {
                const updatedProperties = deepCopy(localCategory.allowedProperties);
                updatedProperties[index].allowedValues.push("");
                setLocalCategory({
                  ...localCategory,
                  allowedProperties: updatedProperties,
                });
              }}
            >
              <AddIcon />
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
                allowedProperties: localCategory.allowedProperties,
              })
            }
            style={{ marginRight: "8px" }}
          >
            Save
          </Button>

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
                {renderAllowedProperties()}
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
