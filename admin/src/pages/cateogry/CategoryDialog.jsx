import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem } from "@mui/material";

const Dialogs = ({
  propertyDialogOpen,
  closePropertyDialog,
  newPropertyKey,
  setNewPropertyKey,
  handleCreateProperty,
  deleteDialogOpen,
  closeDeleteDialog,
  handleDeleteCategory,
  localCategory,
  deletePropertyDialogOpen,
  closeDeletePropertyDialog,
  handleDeleteProperty,
  propertyToDelete,
  setPropertyToDelete,
  categoryProperties,
}) => (
  <>
    <Dialog open={propertyDialogOpen} onClose={closePropertyDialog}>
      <DialogTitle>Create New Property</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Property Key" type="text" fullWidth value={newPropertyKey} onChange={(e) => setNewPropertyKey(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closePropertyDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateProperty} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this category? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDeleteCategory(localCategory.slug);
            closeDeleteDialog();
          }}
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={deletePropertyDialogOpen} onClose={closeDeletePropertyDialog}>
      <DialogTitle>Delete Property</DialogTitle>
      <DialogContent>
        <DialogContentText>Select a property to delete.</DialogContentText>
        <Select value={propertyToDelete} onChange={(e) => setPropertyToDelete(e.target.value)} fullWidth>
          {categoryProperties.map((property) => (
            <MenuItem key={property._id} value={property._id}>
              {property.key}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeletePropertyDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDeleteProperty(propertyToDelete)} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </>
);

export default Dialogs;
