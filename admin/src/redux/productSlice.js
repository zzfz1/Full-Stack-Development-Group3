import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productAPI from "../redux/productAPI";

export const getAllProductsAsync = createAsyncThunk("products/getAll", async () => {
  const response = await productAPI.getAllProductsAPI();
  return response;
});

export const getProductBySlugAsync = createAsyncThunk(
  "products/getProductBySlug", //
  async (slug, { rejectWithValue }) => {
    try {
      const response = await productAPI.getProductBySlugAPI(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProduct", //
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await productAPI.createProductAPI(newProduct);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProductAsync = createAsyncThunk(
  "products/editProduct", //
  async ({ oldslug, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await productAPI.editProductAPI(oldslug, updatedProduct);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct", //
  async (slug, { rejectWithValue }) => {
    try {
      const response = await productAPI.deleteProductAPI(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const product = createSlice({
  name: "product",
  initialState: { products: [], product: null, status: "idle", error: null },
  reducers: {
    createProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getProductBySlugAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductBySlugAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload; // Set the geted product
        state.error = null;
      })
      .addCase(getProductBySlugAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // ... other cases
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex((product) => product._id === action.payload);
        if (index !== -1) {
          state.products.splice(index, 1);
        }
        state.error = null;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { createProduct, editProduct, deleteProduct } = product.actions;

export const productReducer = product.reducer;
