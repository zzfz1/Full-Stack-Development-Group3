import React from "react";
import Header from "../components/header/navbar";
import { GoogleLogin } from "@react-oauth/google";
import { responseMessage, errorMessage } from "../googleAuth";

const SignIn = () => {
  return (
    <div>
      <Header />
      <div>
          <h2>React Google Login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </div>
  );
};

export default SignIn;