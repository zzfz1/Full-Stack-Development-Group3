import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import { loginUserAsync } from "../../redux/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUserAsync({ email, password }));
    if (loginUserAsync.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" margin="normal" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <TextField fullWidth label="Password" margin="normal" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
