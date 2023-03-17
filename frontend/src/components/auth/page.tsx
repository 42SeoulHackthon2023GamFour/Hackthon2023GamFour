import React from "react";
import ScramblerComponent from "../effects/Scrambler";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>
        <ScramblerComponent text={"42FUNDING"} />
      </h2>
      <button
        className="oauth-button"
        onClick={() =>
          (window.location.href = process.env.REACT_APP_LOGIN_URL || "/home")
        }
      >
        Log in with 42Seoul
      </button>
    </div>
  );
};

export default Login;
