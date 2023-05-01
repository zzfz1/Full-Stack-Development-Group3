import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./loginAdminSlice";
import loginAdminReducer from "./categorySlice"

export default configureStore({
  reducer: {
    user: loginAdminReducer,
    category: categoryReducer,
  },
});

// The state store holds the entire application's state in a single object

// reducers are pure functions that take the current state and an action, then return the new state.
