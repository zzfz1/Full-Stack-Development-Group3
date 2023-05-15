import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryPropertiesAPI, createCategoryPropertyAPI, deleteCategoryPropertyAPI } from "../redux/categoryPropertyAPI";

export const getCategoryPropertiesAsync = createAsyncThunk("categories/getCategoryProperties", async (slug, { rejectWithValue }) => {
  try {
    const response = await getCategoryPropertiesAPI();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createCategoryPropertyAsync = createAsyncThunk("categories/createCategoryProperty", async ({ key }, { rejectWithValue }) => {
  try {
    const response = await createCategoryPropertyAPI(key);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCategoryPropertyAsync = createAsyncThunk("categories/deleteCategoryProperty", async (id, { rejectWithValue }) => {
  try {
    const response = await deleteCategoryPropertyAPI(id);
    return { ...response, id }; // include id in the returned payload
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const categoryPropertySlice = createSlice({
  name: "categoryPropertySlice",
  initialState: { properties: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryPropertyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategoryPropertyAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.properties = [...state.properties, action.payload];
        state.error = null;
      })
      .addCase(createCategoryPropertyAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCategoryPropertiesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryPropertiesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(getCategoryPropertiesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategoryPropertyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategoryPropertyAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("delete succeeded payloadID: ", action.payload.id); // access the id from the payload
        state.properties = state.properties.filter((property) => property._id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteCategoryPropertyAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createCategory, deleteCategory } = categoryPropertySlice.actions;

// export default categoryPropertySlice.reducer;
export const categoryPropertyReducer = categoryPropertySlice.reducer;
