import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
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
  TableSortLabel,
  TableBody,
  Container,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { getAllUsersAsync, updateUserAsync, deleteUserAsync } from "../../redux/userSlice";

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

function getComparator(user, orderBy) {
  return user === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const user = comparator(a[0], b[0]);
    if (user !== 0) return user;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

  const handleUpdateUser = () => {
    dispatch(updateUserAsync({ userSlug: selectedUser.slug, userData: selectedUser }));
    dispatch(getAllUsersAsync());
    handleCloseEditDialog();
  };

  const handleDeleteUser = () => {
    dispatch(deleteUserAsync(selectedUser.slug));
    dispatch(getAllUsersAsync());
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

        {/* Edit User Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={selectedUser?.name || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              value={selectedUser?.username || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
            />
            <TextField
              margin="dense"
              id="email"
              label="email"
              type="text"
              fullWidth
              value={selectedUser?.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
            />
            <FormControlLabel
              control={
                //
                <Switch checked={selectedUser?.isAdmin || false} onChange={(e) => setSelectedUser({ ...selectedUser, isAdmin: !selectedUser?.isAdmin })} id="isAdmin" />
              }
              label="Is Admin"
            />
            <TextField margin="dense" id="img" label="img" type="text" fullWidth value={selectedUser?.img || ""} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} color="primary">
              Update
            </Button>
            <Button onClick={() => handleOpenDeleteDialog(selectedUser)} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this user?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default UserList;
