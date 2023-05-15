import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserAPI, loginUserAPI, updateUserAPI, getUserBySlug, logoutUserAPI, getAllUsersAPI, deleteUserAPI } from "./userAPI";

export const createUserAsync = createAsyncThunk("users/createUser", async (userData, { rejectWithValue }) => {
  try {
    const user = await createUserAPI(userData);
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUserAsync = createAsyncThunk("users/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUserAPI(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUserAsync = createAsyncThunk("users/updateUser", async ({ userSlug, userData }, { rejectWithValue }) => {
  try {
    const response = await updateUserAPI(userSlug, userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteUserAsync = createAsyncThunk("users/deleteUser", async (userSlug, { rejectWithValue }) => {
  try {
    const response = await deleteUserAPI(userSlug);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getAllUsersAsync = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const users = await getAllUsersAPI();
    return users;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getUserBySlugAsync = createAsyncThunk(
  //
  "users/getUserBySlug",
  async (userSlug, { rejectWithValue }) => {
    try {
      const user = await getUserBySlug(userSlug);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUserAsync = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const response = await logoutUserAPI();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    //
    users: [],
    user: null,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, //
    edittingUser:"",
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
    createOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex((order) => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      const index = state.orders.findIndex((order) => order._id === action.payload);
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllUsers

      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // getUserBySlugAsync
      .addCase(getUserBySlugAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserBySlugAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.edittingUser = action.payload;
        state.error = null;
      })
      .addCase(getUserBySlugAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // createUserAsync
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.edittingUser = action.payload;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // loginUserAsync
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // updateUserAsync
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.edittingUser = action.payload;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // deleteUserAsync
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted user from the state
        state.users = state.users.filter((user) => user.slug !== action.payload.slug);
        state.error = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
