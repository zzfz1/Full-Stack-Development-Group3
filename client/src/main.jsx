import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import theme from "./style/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PersistGate loading="null" persistor={persistor}>
          <ToastContainer />
          <App />
        </PersistGate>
      </ChakraProvider>
    </Provider>
  </GoogleOAuthProvider>
);
