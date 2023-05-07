import React from "react";
import { IconButton } from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function googleLogin() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

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
          setProfile(res.data);
          let exists = await axios.get(
            `http://localhost:3000/api/users/check/${res.data.email}`
          );
          if (exists.data) {
            const user = await axios.post(
              "http://localhost:3000/api/users/login/google",
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
            navigate(`/`);
          } else {
            navigate(
              `/register?name=${res.data.given_name}&email=${res.data.email}`
            );
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <div>
      <IconButton
        onClick={() => login()}
        aria-label="google"
        variant="ghost"
        size="lg"
        isRound={true}
        _hover={{ bg: "primary.500" }}
        icon={<BsGoogle size="40px" />}
      />
    </div>
  );
}
export default googleLogin;
