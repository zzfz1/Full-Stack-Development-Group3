import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Chip,
  Switch,
  FormControlLabel,
  Container,
} from "@mui/material";

import { getAllOrdersAsync, updateOrderAsync, deleteOrderAsync } from "../../redux/orderSlice";

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

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Define the table headers
const headCells = [
  { id: "createdAt", numeric: false, disablePadding: false, label: "Created At" },
  { id: "updatedAt", numeric: false, disablePadding: false, label: "Updated At" },
  { id: "username", numeric: false, disablePadding: false, label: "Username" },
  { id: "totalPrice", numeric: true, disablePadding: false, label: "Total Price (€)" },
  { id: "isPaid", numeric: false, disablePadding: false, label: "Is Paid" },
  { id: "isDelivered", numeric: false, disablePadding: false, label: "Is Delivered" },
];

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  const handleOpenEditDialog = (order) => {
    setSelectedOrder(order);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedOrder(null);
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = (order) => {
    setSelectedOrder(order);
    console.log("oder: ", order);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleUpdateOrder = async () => {
    await dispatch(updateOrderAsync({ id: selectedOrder._id, updatedOrder: selectedOrder }));
    console.log("selectedOrder: ", selectedOrder);
    await dispatch(getAllOrdersAsync());
    handleCloseEditDialog();
  };

  const handleDeleteOrder = async () => {
    await dispatch(deleteOrderAsync(selectedOrder._id));
    await dispatch(getAllOrdersAsync());
    handleCloseDeleteDialog();
    handleCloseEditDialog();
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
              Order List
            </Typography>
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
              {stableSort(orders, getComparator(order, orderBy)).map((order, index) => {
                return (
                  <TableRow hover key={order._id} onClick={() => handleOpenEditDialog(order)}>
                    <TableCell component="th" scope="row">
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{new Date(order.updatedAt).toLocaleString()}</TableCell>
                    <TableCell>{order.user.username}</TableCell>
                    <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip label={order.isPaid ? "Paid" : "Not Paid"} color={order.isPaid ? "primary" : "secondary"} />
                    </TableCell>
                    <TableCell>
                      <Chip label={order.isDelivered ? "Delivered" : "Not Delivered"} color={order.isDelivered ? "primary" : "secondary"} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Order Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Order</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Order ID" type="text" fullWidth value={selectedOrder?._id || ""} disabled />
            <TextField margin="dense" id="username" label="Username" type="text" fullWidth value={selectedOrder?.user.username || ""} disabled />
            <TextField margin="dense" id="totalPrice" label="Total Price" type="number" fullWidth value={selectedOrder?.totalPrice || ""} disabled />
            <FormControlLabel
              control={<Switch checked={selectedOrder?.isPaid || false} onChange={(e) => setSelectedOrder({ ...selectedOrder, isPaid: e.target.checked })} id="isPaid" />}
              label="Is Paid"
            />

            <FormControlLabel
              control={<Switch checked={selectedOrder?.isDelivered || false} onChange={(e) => setSelectedOrder({ ...selectedOrder, isDelivered: e.target.checked })} id="isDelivered" />}
              label="Is Delivered"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateOrder} color="primary">
              Update
            </Button>
            <Button onClick={() => handleOpenDeleteDialog(selectedOrder)} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Order Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this order?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteOrder} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default OrderList;
