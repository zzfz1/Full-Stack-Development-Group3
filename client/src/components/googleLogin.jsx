import React from "react";
import { Button, Center, IconButton, Text } from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux.jsx";
import { FcGoogle } from "react-icons/fc";

function googleLogin() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      toast.error("Oop! filed to login", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Login Failed:", error);
    },
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          let exists = await axios.get(
            `https://us-central1-web-shop-group-3.cloudfunctions.net/api/users/check/${res.data.email}`,
            { withCredentials: true }
          );
          if (exists.data) {
            const userInfo = await axios.post(
              "https://us-central1-web-shop-group-3.cloudfunctions.net/api/users/login/google",
              {
                email: res.data.email,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(userInfo);
            dispatch(loginSuccess(userInfo.data));
            navigate(`/`);
          } else {
            navigate(
              `/register?name=${res.data.given_name}&email=${res.data.email}&img=${res.data.picture}`
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  return (
    <div>
      <Button
        onClick={() => login()}
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </div>
  );
}
export default googleLogin;
