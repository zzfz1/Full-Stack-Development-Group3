import React from 'react';
import { IconButton } from "@chakra-ui/react";
import {BsGoogle } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

function googleLogin()
{

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
      
    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    
    return(
        <div>
            {profile ? 
            (
                <div>
                <h3>User {profile.name} Logged in</h3>
                <h3>{profile.email}</h3>
                <button onClick={logOut}>Log out</button>
                </div>
            ):(

                <IconButton
                onClick={() => login()}
                aria-label="google"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "primary.500" }}
                icon={<BsGoogle size="40px" />}
                />
            )}
        </div>
    );
}
export default googleLogin;