import React, { useState } from "react";
import ProductDetail from "./page";
import { Navigate, useParams } from "react-router-dom";
import MakeDetailData from "./makeDetailData";

const DetailIndex = () => {
  const token = sessionStorage.getItem("token");
  const rtoken = sessionStorage.getItem("rtoken");
  if (token === "undefined" || rtoken === "undefined" || !token || !rtoken)
    return <Navigate to="/" replace />;
  return <MakeDetailData />;
};

export default DetailIndex;
