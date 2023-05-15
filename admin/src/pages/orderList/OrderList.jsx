import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Chip, Container } from "@mui/material";

import { getAllOrdersAsync, updateOrderAsync, deleteOrderAsync } from "../../redux/orderSlice";
import { getComparator, stableSort } from "../utils/sortHelper";
import { EditOrderDialog, DeleteOrderDialog } from "./OrderListDialog";

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

  const handlePaidStatusChange = (e) => {
    setSelectedOrder({ ...selectedOrder, isPaid: e.target.checked });
  };

  const handleDeliveredStatusChange = (e) => {
    setSelectedOrder({ ...selectedOrder, isDelivered: e.target.checked });
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

        <EditOrderDialog
          open={openEditDialog}
          handleClose={handleCloseEditDialog}
          handleUpdate={handleUpdateOrder}
          order={selectedOrder}
          handleOpenDeleteDialog={() => handleOpenDeleteDialog(selectedOrder)}
          handlePaidStatusChange={handlePaidStatusChange}
          handleDeliveredStatusChange={handleDeliveredStatusChange}
        />
        <DeleteOrderDialog open={openDeleteDialog} handleClose={handleCloseDeleteDialog} handleDelete={handleDeleteOrder} />
      </Container>
    </Box>
  );
};

export default OrderList;
