import { useNavigate } from "react-router-dom";
import { postLoginAsync } from "../../redux/loginAdminSlice";
import "./user.css"
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  console.log('asdd');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [admin, setAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      console.log('email', email, password);
      const postAsync = await dispatch(postLoginAsync({ email, password }));
      const checkAdmin = postAsync.payload.isAdmin
      if (checkAdmin) {
        navigate("/home");
      } else {
        alert("wrong email or password!!")
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userUpdate">
          <h1 className="userTitle">Admin Login</h1>
          <form className="userUpdateForm" onSubmit={handleLogin}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="userInput"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  className="userInput"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
          <button className="userUpdateButton">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}