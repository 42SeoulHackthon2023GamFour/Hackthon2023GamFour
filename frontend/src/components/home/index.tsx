import { Product } from "./types";
import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Home from "./page";

const HomeIndex = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { token, rtoken } = params;
  console.log("Index");
  if (token !== undefined && rtoken !== undefined) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rtoken");
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("rtoken", rtoken);
    window.history.pushState("", "", "/home");
  } else {
    const token = sessionStorage.getItem("token");
    const rtoken = sessionStorage.getItem("rtoken");
    if (token === "undefined" || rtoken === "undefined")
      return <Navigate to="/" replace></Navigate>;
  }
  return <Home />;
};

export default HomeIndex;
