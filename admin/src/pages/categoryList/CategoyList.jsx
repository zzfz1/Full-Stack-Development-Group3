import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesAsync, createCategoryAsync } from "../../redux/categorySlice";
import { Link } from "react-router-dom";
import { Box, Button, Card, Typography, Grid, CardActions, AppBar, Toolbar } from "@mui/material";
import { Container, TextField, FormHelperText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState("");

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);

  const handleCreateCategory = async () => {
    if (!categoryName) return;

    const existingCategory = categories.find((category) => category.name === categoryName);

    if (existingCategory) {
      setCategoryNameError("Category with the same name already exists.");
      return;
    }

    try {
      const blankData = {
        name: categoryName,
        categoryProperties: [],
      };
      dispatch(createCategoryAsync(blankData));
      setCategoryNameError("");
      setOpenCategoryDialog(false);
      // const newCategory = await createCategoryAPI(blankData);
      // navigate(`/categories/${newCategory.slug}`);
    } catch (error) {
      console.error("Error creating empty category:", error);
    }
  };

  const handleCategoryDialogClose = () => {
    setCategoryNameError("");
    setOpenCategoryDialog(false);
  };

  const handleCategoryDialogOpen = () => {
    setOpenCategoryDialog(true);
  };
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" flexGrow={1}>
              Category List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCategoryDialogOpen}>
              Create New Category
            </Button>
          </Toolbar>
        </AppBar>

        <Grid item xs={12}>
          <Box
            mt={3}
            sx={{
              maxHeight: "calc(100vh - 128px)",
              overflowY: "auto",
            }}
          >
            {status === "loading" ? (
              <Typography>Loading...</Typography>
            ) : (
              <Grid container spacing={2}>
                {categories.map((category) => (
                  <Grid item xs={12} md={12} key={category._id}>
                    <Card
                      sx={{
                        textDecoration: "none",
                        width: "100%",
                        borderRadius: 1,
                        borderColor: (theme) => theme.palette.divider,
                        borderWidth: 1,
                        borderStyle: "solid",
                        "&:hover": {
                          boxShadow: (theme) => theme.shadows[6],
                          textDecoration: "none",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <CardActions>
                        <Button
                          component={Link}
                          to={`/categories/${category.slug}`}
                          size="large"
                          sx={{
                            textDecoration: "none",
                            width: "100%",
                            justifyContent: "flex-start",
                            textTransform: "none",
                          }}
                        >
                          {category.name}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Container>
      <Dialog open={openCategoryDialog} onClose={handleCategoryDialogClose} aria-labelledby="select-category-dialog-title">
        <DialogTitle id="select-category-dialog-title">Select Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Select a category for the new category:</DialogContentText>
          <DialogContentText>Enter the category name and select a category for the new category:</DialogContentText>
          <TextField autoFocus margin="dense" id="category-name" label="Category Name" type="text" fullWidth value={categoryName} onChange={handleCategoryNameChange} error={!!categoryNameError} />
          {categoryNameError && <FormHelperText error>{categoryNameError}</FormHelperText>}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCategoryDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateCategory} color="primary" disabled={!categoryName}>
            Create Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
