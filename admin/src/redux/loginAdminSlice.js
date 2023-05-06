import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAdminAPI } from "./loginAdminApi";

// export const postLoginAsync = createAsyncThunk("login", async (newLogin) => {
//     const response = await loginAdminAPI(newLogin);
//     console.log('response', response.isAdmin);
//     return response;
// });

// const loginSlice = createSlice({
//   name: "user",
//   initialState: { users: [], user: null, status: "idle", error: null },
//   reducers: {
//     createUser: (state, action) => {
//       state.users.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // ... other cases
//       .addCase(postLoginAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(postLoginAsync.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.users.push(action.payload);
//         state.error = null;
//       })
//       .addCase(postLoginAsync.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })

//   },
// });

// import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      // console.log('action', action.payload);
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

// export const { createUser } = loginSlice.actions;
export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;


export default loginSlice.reducer;
