import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Switch } from "@mui/material";

export const EditUserDialog = ({ open, handleClose, user, handleUpdate, handleDelete }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleChange = (field) => (event) => {
    if (field === "isAdmin") {
      setUpdatedUser({ ...updatedUser, [field]: event.target.checked });
    } else {
      setUpdatedUser({ ...updatedUser, [field]: event.target.value });
    }
  };

  const handleSubmit = () => {
    handleUpdate(updatedUser);
    console.log("updatedUser", updatedUser);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth value={updatedUser?.name || ""} onChange={handleChange("name")} />
        <TextField margin="dense" id="username" label="Username" type="text" fullWidth value={updatedUser?.username || ""} onChange={handleChange("username")} />
        <TextField margin="dense" id="email" label="Email" type="text" fullWidth value={updatedUser?.email || ""} onChange={handleChange("email")} />
        {/* <FormControlLabel
          control={<Switch checked={updatedUser?.isAdmin || false} onChange={() => setUpdatedUser({ ...updatedUser, isAdmin: !updatedUser?.isAdmin })} id="isAdmin" />}
          label="Is Admin"
        /> */}
        <FormControlLabel control={<Switch checked={updatedUser?.isAdmin || false} onChange={handleChange("isAdmin")} id="isAdmin" />} label="Is Admin" />

        {/* <FormControlLabel
          control={<Switch checked={updatedUser?.isAdmin || false} onChange={(event, checked) => setUpdatedUser({ ...updatedUser, isAdmin: checked })} id="isAdmin" />}
          label="Is Admin"
        /> */}

        <TextField margin="dense" id="img" label="Image URL" type="text" fullWidth value={updatedUser?.img || ""} onChange={handleChange("img")} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
        <Button onClick={() => handleDelete(updatedUser)} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteUserDialog = ({ open, handleClose, user, handleDelete }) => {
  const handleSubmit = () => {
    handleDelete(user);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this user?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
