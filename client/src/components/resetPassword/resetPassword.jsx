import React, { useEffect } from "react";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import ResetForm from "./resetForm";
import InvalidLink from "./invalidLink";


function ResetPassword() {
  let [validUser, setValidUser] = useState(false);
  let [validating, setValidating] = useState(true);
  const location = useLocation();
  const baseUrl = "http://localhost:3000/api/users/reset/verify";
  console.log("first.", location);

  const { token, user } = queryString.parse(location.search);
  console.log("user is: " + user);
  console.log("token is: " + token);
  const verifyToken = async () => {
    try {
      setValidating(false);
      const { data } = await axios(`${baseUrl}/${token}`);
      console.log("verified token", data.verified);
      if (data.verified) {
        console.log("if its true");
        return setValidUser(true);
      } else {
        setValidating(false);
      }
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.verified) {
          console.log("inside the data is", error?.response?.data);
          setValidating(false);
          return setValidUser(false);
        }
        return console.log("data error", error.response.data);
      }
      console.log("error", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (validUser) {
    return <ResetForm user={user} />;
  }
  if (validating) {
    return <h1>validating ................</h1>;
  }
  return <InvalidLink />;
}

export default ResetPassword;
