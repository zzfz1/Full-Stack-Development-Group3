import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";

export default configureStore({
  reducer: {
    category: categoryReducer,
  },
});

// The state store holds the entire application's state in a single object

// reducers are pure functions that take the current state and an action, then return the new state.
