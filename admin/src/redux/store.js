import { configureStore } from "@reduxjs/toolkit";

import { categoryReducer } from "./categorySlice";
import { productReducer } from "./productSlice";
import { orderReducer } from "./orderSlice";
import userReducer from "./userSlice";
import drawerReducer from "./drawerSlice";

import { manageUserMiddleware } from "./utils/userStoreMiddleware";

export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(manageUserMiddleware),
});

// Redux store = Object that holds the states
