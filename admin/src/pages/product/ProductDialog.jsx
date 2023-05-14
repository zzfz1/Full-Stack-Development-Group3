import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ProductDialog = ({ open, onClose, onDelete, slug }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this product? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDelete(slug);
            onClose();
          }}
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
