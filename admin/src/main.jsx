import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// import { useSelector } from "react-redux";

//add a mock user object to localStorage if they do
const mockUser = {
  currentUser: {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "admin",
    isAdmin: true,
    accessToken: "123",
  },
};
localStorage.setItem("user", JSON.stringify(mockUser));

// const admin = useSelector((state) => state.user.currentUser.isAdmin);
// console.log("admin:", admin);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
