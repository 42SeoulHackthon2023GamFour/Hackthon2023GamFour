import React, { useRef, useState, useEffect } from "react";
import Scrambler from "../effects/textScreamble";
import "./login.css";

const Login = () => {
  const [text, setText] = useState("42FUNDING");
  const scramblerRef = useRef(new Scrambler());
  useEffect(() => {
    // call scramble function with the text to be scrambled and handler.
    scramblerRef.current.scramble(text, setText);
  }, []);
  return (
    <div className="login-container">
      <h2>{text}</h2>
      <button
        className="oauth-button"
        onClick={() => (window.location.href = process.env.REACT_APP_LOGIN_URL || "/home")}
      >
        Log in with 42Seoul
      </button>
    </div>
  );
};

export default Login;
