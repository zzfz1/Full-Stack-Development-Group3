import React from "react";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Switch } from "@mui/material";

export const EditOrderDialog = ({ open, handleClose, handleUpdate, order, handleOpenDeleteDialog, handlePaidStatusChange, handleDeliveredStatusChange }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Edit Order</DialogTitle>
    <DialogContent>
      <TextField autoFocus margin="dense" id="name" label="Order ID" type="text" fullWidth value={order?._id || ""} disabled />
      <TextField margin="dense" id="username" label="Username" type="text" fullWidth value={order?.user.username || ""} disabled />
      <TextField margin="dense" id="totalPrice" label="Total Price" type="number" fullWidth value={order?.totalPrice || ""} disabled />
      <FormControlLabel control={<Switch checked={order?.isPaid || false} onChange={handlePaidStatusChange} id="isPaid" />} label="Is Paid" />

      <FormControlLabel control={<Switch checked={order?.isDelivered || false} onChange={handleDeliveredStatusChange} id="isDelivered" />} label="Is Delivered" />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUpdate} color="primary">
        Update
      </Button>
      <Button onClick={handleOpenDeleteDialog} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export const DeleteOrderDialog = ({ open, handleClose, handleDelete }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this order?"}</DialogTitle>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleDelete} color="secondary" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
