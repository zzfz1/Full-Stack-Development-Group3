// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productAPI from "../api/productAPI";

export const fetchAllProductsAsync = createAsyncThunk("products/fetchAll", async () => {
  const response = await productAPI.getAllProducts();
  return response;
});

export const fetchProductBySlugAsync = createAsyncThunk("products/fetchBySlug", async (slug) => {
  const response = await productAPI.getProductBySlug(slug);
  return response;
});

export const updateProductAsync = createAsyncThunk("products/update", async (product) => {
  await productAPI.updateProduct(product.slug, product);
});

export const deleteProductAsync = createAsyncThunk("products/delete", async (slug) => {
  await productAPI.deleteProduct(slug);
});

export const createProductAsync = createAsyncThunk("products/create", async (product) => {
  await productAPI.createProduct(product);
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductBySlugAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBySlugAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlugAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
