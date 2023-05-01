import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminAPI } from "./loginAdminApi";

// export const fetchCategoriesAsync = createAsyncThunk("categories/fetchCategories", async () => {
//   const response = await fetchCategories();
//   return response;
// });

// export const fetchCategoryBySlugAsync = createAsyncThunk("categories/fetchCategoryBySlug", async (slug, { rejectWithValue }) => {
//   try {
//     const category = await getCategoryBySlugAPI(slug);
//     return category;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });
export const postLoginAsync = createAsyncThunk("login", async (newLogin, { rejectWithValue }) => {
  try {
    const response = await loginAdminAPI(newLogin);
    console.log('response', response.isAdmin);
    return response; // Return the created category
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const loginSlice = createSlice({
  name: "user",
  initialState: { users: [], user: null, status: "idle", error: null },
  reducers: {
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      // ... other cases
      .addCase(postLoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postLoginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(postLoginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});

export const { createUser } = loginSlice.actions;

export default loginSlice.reducer;
