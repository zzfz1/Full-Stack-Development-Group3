import { useNavigate } from "react-router-dom";
// import { postLoginAsync } from "../../redux/loginAdminSlice";
import { login } from "../../redux/loginAdminApi";

import "./user.css"
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  // console.log('asdd');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [admin, setAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // console.log('email', email, password);
      const checkUser = await login(dispatch, { email, password });
      // console.log('checkUser,', checkUser);
      // const postAsync = await dispatch(postLoginAsync({ email, password }));
      // const checkAdmin = postAsync.payload.isAdmin
      // if (checkUser) {
      //   navigate("/home");
      // } else {
      //   alert("wrong email or password!!")
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userLogin">
          <h1 className="userTitle">Admin Login</h1>
          <form className="userLoginForm" onSubmit={handleLogin}>
            <div>
              <div className="userLoginItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="userInput"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userLoginItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="userInput"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="userLoginButton">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}