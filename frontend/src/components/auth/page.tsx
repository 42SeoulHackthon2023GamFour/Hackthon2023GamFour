import React, { useState } from "react";
import ScramblerComponent from "../effects/Scrambler";
import "./login.css";

const Login = () => {
  const [LoginText, setLoginText] = useState("Log in with 42OAuth");
  const onClick = () => {
    setLoginText("Wait a second...");
    window.location.href = process.env.FT_API_LOGIN || "/home";
  };

  return (
    <div className="login-container">
      <h2>
        <ScramblerComponent text={"42FUNDING"} />
      </h2>
      <button disabled={LoginText === "Wait a second..."}className="oauth-button" onClick={onClick}>
        {LoginText}
      </button>
    </div>
  );
};

export default Login;
