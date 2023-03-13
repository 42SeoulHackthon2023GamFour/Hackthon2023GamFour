import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <button
        className="oauth-button"
        onClick={() => (window.location.href = "/home")}
      >
        Log in with 42Seoul
      </button>
    </div>
  );
};

export default Login;
