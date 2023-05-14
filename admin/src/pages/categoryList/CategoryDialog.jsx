import React from "react";
import { TextField, FormHelperText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export const CategoryDialog = ({ open, handleClose, handleCreate, categoryName, handleCategoryNameChange, categoryNameError }) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="select-category-dialog-title">
    <DialogTitle id="select-category-dialog-title">Select Category</DialogTitle>
    <DialogContent>
      <DialogContentText>Select a category for the new category:</DialogContentText>
      <DialogContentText>Enter the category name and select a category for the new category:</DialogContentText>
      <TextField autoFocus margin="dense" id="category-name" label="Category Name" type="text" fullWidth value={categoryName} onChange={handleCategoryNameChange} error={!!categoryNameError} />
      {categoryNameError && <FormHelperText error>{categoryNameError}</FormHelperText>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleCreate} color="primary" disabled={!categoryName}>
        Create Category
      </Button>
    </DialogActions>
  </Dialog>
);
