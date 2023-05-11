import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import logReducer from "./logSlice";
import { manageUserMiddleware } from "../utils/userStoreMiddleware";

export default configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(manageUserMiddleware),
});

// Redux store = Object that holds the states
