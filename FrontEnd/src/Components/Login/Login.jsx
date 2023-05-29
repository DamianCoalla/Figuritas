import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const logeado = async (event) => {
    event.preventDefault();
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_name: user_name,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/login",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        localStorage.setItem("token", respuesta.token);
        navigate("/all");
      } else if (response.status === 404) {
        alert("The user is not registered");
      } else if (response.status === 400) {
        alert("Invalid username and/or password");
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  return (
    <div className="formContainer">
      <h1 className="titulo">Login</h1>
      <form className="loginForm" action="submit" onSubmit={logeado}>
        <input
          className="inputLogin"
          type="text"
          placeholder="User name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={user_name}
        />
        <input
          className="inputLogin"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
        <button className="buttonLogin" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
