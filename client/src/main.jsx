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
import store from "../src/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1068486314099-n87h1p1p97rvjt88kkajmqinn4u0lf9f.apps.googleusercontent.com">
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ToastContainer />
        <App />
      </ChakraProvider>
    </Provider>
  </GoogleOAuthProvider>
);
