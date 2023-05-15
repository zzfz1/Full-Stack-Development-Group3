import React from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductForm = ({
  handleSubmit,
  handleProductChange,
  handleCategoryChange,
  handlePropertyChange,
  addProperty,
  removeProperty,
  addValue,
  removeValue,
  handleValueChange,
  editedProduct,
  allCategories,
  selectedCategory,
  category,
}) => (
  <form onSubmit={handleSubmit} id="product-edit-form">
    <TextField label="Name" variant="outlined" name="name" value={editedProduct.name} onChange={handleProductChange} fullWidth margin="normal" />
    <TextField label="Image" variant="outlined" name="image" value={editedProduct.image} onChange={handleProductChange} fullWidth margin="normal" />
    <TextField label="Brand" variant="outlined" name="brand" value={editedProduct.brand} onChange={handleProductChange} fullWidth margin="normal" />
    <TextField label="Price" variant="outlined" name="price" value={editedProduct.price} onChange={handleProductChange} fullWidth margin="normal" />
    <TextField
      label="Count in Stock"
      variant="outlined"
      name="countInStock"
      value={editedProduct.countInStock}
      onChange={handleProductChange}
      fullWidth
      margin="normal"
      // InputProps={{
      //   readOnly: true,
      // }}
    />
    <TextField label="Description" variant="outlined" name="description" value={editedProduct.description} onChange={handleProductChange} fullWidth margin="normal" />
    <TextField
      label="Rating"
      variant="outlined"
      name="rating"
      value={editedProduct.rating}
      onChange={handleProductChange}
      fullWidth
      margin="normal"
      InputProps={{
        readOnly: true,
      }}
    />
    <TextField
      label="Number of Reviews"
      variant="outlined"
      name="numReviews"
      value={editedProduct.numReviews}
      onChange={handleProductChange}
      fullWidth
      margin="normal"
      InputProps={{
        readOnly: true,
      }}
    />
    <FormControl fullWidth margin="normal">
      <InputLabel id="category-select-label">Category</InputLabel>
      {/* <Select labelId="category-select-label" name="category" value={editedProduct.category} onChange={handleCategoryChange}> */}
      <Select labelId="category-select-label" name="category" defaultValue="" value={selectedCategory || ""} onChange={handleCategoryChange}>
        <MenuItem value="">None</MenuItem>
        {allCategories.map((categoryItem) => (
          <MenuItem key={categoryItem.slug} value={categoryItem.slug || ""}>
            {categoryItem.name || ""}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {editedProduct.properties.map((property, index) => (
      <div key={index}>
        <FormControl fullWidth margin="normal">
          <InputLabel id={`property-select-label-${index}`}>Property</InputLabel>

          <Select
            labelId={`property-select-label-${index}`}
            name="categoryProperty"
            defaultValue=""
            value={property.categoryProperty ? property.categoryProperty._id : ""}
            onChange={(e) => handlePropertyChange(index, e)}
          >
            {category && category.categoryProperties ? (
              category.categoryProperties.map((categoryProperty) => (
                <MenuItem key={categoryProperty._id} value={categoryProperty._id || ""}>
                  {categoryProperty.key || ""}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>{category ? "No properties assigned" : "No category selected"}</MenuItem>
            )}
          </Select>

          <Button variant="outlined" color="error" onClick={() => removeProperty(index)}>
            Remove Property
          </Button>
        </FormControl>
        {property.categoryProperty && (
          <div>
            {property.values.map((valueObj) => (
              <div key={valueObj._id} style={{ display: "flex", alignItems: "center" }}>
                <TextField label="Value" variant="outlined" name="values" value={valueObj.value || ""} onChange={(e) => handleValueChange(index, valueObj._id, e.target.value)} margin="normal" />
                <IconButton onClick={() => removeValue(index, valueObj._id)} color="secondary">
                  <Remove />
                </IconButton>
              </div>
            ))}
            <IconButton onClick={() => addValue(index)} color="primary">
              <Add />
            </IconButton>
          </div>
        )}
      </div>
    ))}
    <Button variant="outlined" color="success" onClick={addProperty}>
      Add Property
    </Button>
  </form>
);

export default ProductForm;
