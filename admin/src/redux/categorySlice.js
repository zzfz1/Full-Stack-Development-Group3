import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryAPI from "../redux/categoryAPI";

export const getAllCategoriesAsync = createAsyncThunk("categories/getAllCategories", async () => {
  const response = await categoryAPI.getAllCategoriesAPI(); // corrected function name
  return response;
});

export const getCategoryBySlugAsync = createAsyncThunk(
  "categories/getCategoryBySlug", //
  async (slug, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.getCategoryBySlugAPI(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCategoryByIdAsync = createAsyncThunk(
  "categories/getCategoryById", //
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.getCategoryByIdAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  "categories/createCategory", //
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.createCategoryAPI(newCategory);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCategoryAsync = createAsyncThunk(
  "categories/editCategory", //
  async ({ oldslug, updatedCategory }, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.editCategoryAPI(oldslug, updatedCategory);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategory", //
  async (slug, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.deleteCategoryAPI(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: { categories: [], category: null, status: "idle", error: null },
  reducers: {
    // createCategory: (state, action) => {
    //   state.categories.push(action.payload);
    // },
    // updateCategory: (state, action) => {
    //   const index = state.categories.findIndex((category) => category._id === action.payload._id);
    //   if (index !== -1) {
    //     state.categories[index] = action.payload;
    //   }
    // },
    // deleteCategory: (state, action) => {
    //   const index = state.categories.findIndex((category) => category._id === action.payload);
    //   if (index !== -1) {
    //     state.categories.splice(index, 1);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(getAllCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCategoryBySlugAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryBySlugAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload; // Set the geted category
        state.error = null;
      })
      .addCase(getCategoryBySlugAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getCategoryByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload; // Set the geted category
        state.error = null;
      })
      .addCase(getCategoryByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
        state.error = null;
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categories.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categories.findIndex((category) => category._id === action.payload);
        if (index !== -1) {
          state.categories.splice(index, 1);
        }
        state.error = null;
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createCategory, updateCategory, deleteCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
