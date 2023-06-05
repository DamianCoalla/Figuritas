import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const registro = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      nombre: nombre,
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
        "http://localhost:3001/api/register",
        requestOptions
      );

      if (response.status === 404) {
        alert("The user name is already in use.");
      } else if (response.ok) {
        const respuesta = await response.json();
        alert("The user has successfully registered");
        navigate("/all");
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  return (
    <div className="registerContainer">
      <h1 className="titulo">Sign Up</h1>
      <form className="registerForm" action="submit" onSubmit={registro}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          value={nombre}
        />
        <input
          className="input"
          type="text"
          placeholder="User name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={user_name}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
        <button className="buttonRegister" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
