import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesAsync, createCategoryAsync } from "../../redux/categorySlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Container,
  TextField,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

// Table sort functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(category, orderBy) {
  return category === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const category = comparator(a[0], b[0]);
    if (category !== 0) return category;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Define the table headers
const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Created At" },
  { id: "updatedAt", numeric: false, disablePadding: false, label: "Updated At" },
];

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryName, setCategoryName] = useState("");

  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const handleNavigateToCategory = (slug) => {
    navigate(`/categories/${slug}`);
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

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto",
          }}
        >
          <Table aria-label="sortable table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={() => handleRequestSort(headCell.id)}>
                      {headCell.label}
                    </TableSortLabel>{" "}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(categories, getComparator(order, orderBy)).map((category) => {
                return (
                  <TableRow hover key={category._id} onClick={() => handleNavigateToCategory(category.slug)}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell scope="row">{new Date(category.createdAt).toLocaleString()}</TableCell>
                    <TableCell scope="row">{new Date(category.updatedAt).toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

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
      </Container>
    </Box>
  );
};

export default CategoryList;
