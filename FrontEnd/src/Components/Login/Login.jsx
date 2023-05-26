import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="formContainer">
      <h1>Login</h1>
      <form className="loginForm" action="submit">
        <input className="input" type="text" placeholder="User name" />
        <input className="input" type="password" placeholder="Password" />
        <button className="buttonLogin">Login</button>
      </form>
    </div>
  );
}

export default Login;
