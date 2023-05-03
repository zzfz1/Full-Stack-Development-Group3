// import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"

// export default configureStore({
//   reducer: {
//     user: loginAdminReducer,
//     category: categoryReducer,
//   },
// });

// The state store holds the entire application's state in a single object

// reducers are pure functions that take the current state and an action, then return the new state.


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginAdminSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: loginReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);