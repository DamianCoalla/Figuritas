import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  const goRegister = () => {
    navigate("/register");
  };
  return (
    <div>
      <div className="contentWrapper">
        <h2 className="title">NBA Figurines Trade</h2>
      </div>
      <div className="buttonGroup">
        <button className="loginBtn" onClick={goLogin}>
          LogIn
        </button>
        <button className="signupBtn" onClick={goRegister}>
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Home;
