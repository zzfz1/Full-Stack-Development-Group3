import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories, createCategoryAPI, editCategoryAPI, getCategoryBySlugAPI, deleteCategoryAPI } from "./categoryAPI";

export const fetchCategoriesAsync = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await fetchCategories();
  return response;
});

export const fetchCategoryBySlugAsync = createAsyncThunk("categories/fetchCategoryBySlug", async (slug, { rejectWithValue }) => {
  try {
    const category = await getCategoryBySlugAPI(slug);
    return category;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const createCategoryAsync = createAsyncThunk("categories/createCategory", async (newCategory, { rejectWithValue }) => {
  try {
    const response = await createCategoryAPI(newCategory);
    return response; // Return the created category
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editCategoryAsync = createAsyncThunk("categories/editCategory", async ({ oldslug, updatedCategory }, { rejectWithValue }) => {
  console.log("oldslugAPI: ", oldslug);
  try {
    const response = await editCategoryAPI(oldslug, updatedCategory);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCategoryAsync = createAsyncThunk("categories/deleteCategory", async (slug, { rejectWithValue }) => {
  try {
    const response = await deleteCategoryAPI(slug);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const categorySlice = createSlice({
  name: "user",
  initialState: { categories: [], category: null, status: "idle", error: null },
  reducers: {
    createCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex((category) => category._id === action.payload._id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      const index = state.categories.findIndex((category) => category._id === action.payload);
      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategoryBySlugAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryBySlugAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload; // Set the fetched category
        state.error = null;
      })
      .addCase(fetchCategoryBySlugAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // ... other cases
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

export default categorySlice.reducer;
