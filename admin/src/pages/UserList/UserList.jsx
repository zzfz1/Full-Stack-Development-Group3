import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHead, TableRow, TableCell, Paper, TableContainer, Box, Typography, AppBar, Toolbar, TableSortLabel, TableBody, Container, Switch } from "@mui/material";
import { getAllUsersAsync, updateUserAsync, deleteUserAsync } from "../../redux/userSlice";
import { getComparator, stableSort } from "../utils/sortHelper";
import { EditUserDialog, DeleteUserDialog } from "./UserListDialog";

// Define the table headers
const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "username", numeric: false, disablePadding: false, label: "Username" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Created At" },
  { id: "updatedAt", numeric: false, disablePadding: false, label: "Updated At" },
];

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [selectedUser, setSelectedUser] = useState(null);
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
    dispatch(getAllUsersAsync());
    console.log("users: ", users);
  }, [dispatch]);

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedUser(null);
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUser(null);
    setOpenDeleteDialog(false);
  };

  const handleUpdateUser = async (updatedUser) => {
    await dispatch(updateUserAsync({ userSlug: updatedUser.slug, userData: updatedUser }));
    await dispatch(getAllUsersAsync());
    handleCloseEditDialog();
  };

  const handleDeleteUser = async () => {
    await dispatch(deleteUserAsync(selectedUser.slug));
    await dispatch(getAllUsersAsync());
    handleCloseDeleteDialog();
    handleCloseEditDialog();
  };
  console.log("users", users);
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
              User List
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
              {stableSort(users, getComparator(order, orderBy)).map((user, index) => {
                return (
                  <TableRow hover key={user._id} onClick={() => handleOpenEditDialog(user)}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(user.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <EditUserDialog open={openEditDialog} handleClose={handleCloseEditDialog} user={selectedUser} handleUpdate={handleUpdateUser} handleDelete={handleOpenDeleteDialog} />
        <DeleteUserDialog open={openDeleteDialog} handleClose={handleCloseDeleteDialog} user={selectedUser} handleDelete={handleDeleteUser} />
      </Container>
    </Box>
  );
};

export default UserList;
