import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesAsync } from "../../redux/categorySlice";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardHeader, CardContent, Typography, Grid, CardActions, IconButton, AppBar, Toolbar } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { createCategoryAPI } from "../../redux/categoryAPI";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);

  const handleCreateCategory = async () => {
    try {
      const blankData = {
        name: "New Category",
        categoryProperties: [],
      };

      const newCategory = await createCategoryAPI(blankData);
      navigate(`/categories/${newCategory.slug}`);
    } catch (error) {
      console.error("Error creating empty category:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Category List
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCreateCategory}>
            Create New Category
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box mt={8}>
            {status === "loading" ? (
              <Typography>Loading...</Typography>
            ) : (
              <Grid container spacing={2}>
                {categories.map((category) => (
                  <Grid item xs={12} md={12} key={category._id}>
                    <Card>
                      <CardHeader title={category.name} />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {/* You can add any additional details about the category here */}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton color="primary" component={Link} to={`/categories/${category.slug}`}>
                          <EditIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryList;
