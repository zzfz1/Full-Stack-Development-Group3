import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductsAsync, createProductAsync } from "../../redux/productSlice";
import { getAllCategoriesAsync } from "../../redux/categorySlice";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  TextField,
  FormHelperText,
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

// A function to handle sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(product, orderBy) {
  return product === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const product = comparator(a[0], b[0]);
    if (product !== 0) return product;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Define the table headers
const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "brand", numeric: false, disablePadding: false, label: "Brand" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "category", numeric: false, disablePadding: false, label: "Category" },
  { id: "rating", numeric: false, disablePadding: false, label: "Rating" },
  { id: "countInStock", numeric: true, disablePadding: false, label: "countInStock" },
  { id: "updatedAt", numeric: false, disablePadding: false, label: "Updated At" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [productName, setProductName] = useState("");

  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    dispatch(getAllProductsAsync());
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);
  const handleCreateProduct = async () => {
    if (!selectedCategory || !productName) return;

    const existingProduct = products.find((product) => product.name === productName);

    if (existingProduct) {
      setProductNameError("Product with the same name and category already exists.");
      return;
    }

    try {
      const blankData = {
        name: productName,
        image: "",
        brand: "",
        category: selectedCategory,
        description: "",
        properties: [],
        price: 0,
        countInStock: 0,
      };
      dispatch(createProductAsync(blankData));
      setProductNameError("");
      setOpenCategoryDialog(false);
    } catch (error) {
      console.error("Error creating empty product:", error);
    }
  };

  const handleCategoryDialogClose = () => {
    setProductNameError("");
    setOpenCategoryDialog(false);
  };

  const handleCategoryDialogOpen = () => {
    setOpenCategoryDialog(true);
  };
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
    console.log("setSelectedCategory", event.target.value);
  };

  const handleNavigateToProduct = (slug) => {
    navigate(`/products/${slug}`);
  };
  console.log("products: ", products);
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
              Product List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCategoryDialogOpen}>
              Create New Product
            </Button>
          </Toolbar>
        </AppBar>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto",
            overflowX: "auto",
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
              {stableSort(products, getComparator(order, orderBy)).map((product) => {
                return (
                  <TableRow hover key={product._id} onClick={() => handleNavigateToProduct(product.slug)}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.countInStock}</TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(product.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openCategoryDialog} onClose={handleCategoryDialogClose} aria-labelledby="select-category-dialog-title">
          <DialogTitle id="select-category-dialog-title">Select Category</DialogTitle>
          <DialogContent>
            <DialogContentText>Select a category for the new product:</DialogContentText>
            <DialogContentText>Enter the product name and select a category for the new product:</DialogContentText>
            <TextField autoFocus margin="dense" id="product-name" label="Product Name" type="text" fullWidth value={productName} onChange={handleProductNameChange} error={!!productNameError} />
            {productNameError && <FormHelperText error>{productNameError}</FormHelperText>}

            <FormControl fullWidth>
              <InputLabel htmlFor="select-category">Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategorySelect}
                inputProps={{
                  name: "category",
                  id: "select-category",
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCategoryDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleCreateProduct} color="primary" disabled={!selectedCategory || !productName}>
              Create Product
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProductList;
