import { Product, ProductLists, genProductListProps } from "./types";
import React, { useEffect, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import Home from "./page";
import genProductList, { CallListTwo } from "./genProductList";

const HomeIndex = () => {
  //ProductList
  console.log(CallListTwo());
  const [ProductList, setProductList] = useState<ProductLists | null>(null);
  useEffect(() => {
    genProductList({
      ProductList: ProductList,
      setProductLists: setProductList,
    });
  }, []);
  //token Controll
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { token, rtoken, username } = params;
  if (token !== undefined && rtoken !== undefined) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rtoken");
    sessionStorage.removeItem("username");
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("rtoken", rtoken);
    sessionStorage.setItem("username", username);
    window.history.pushState("", "", "/home");
  } else {
    const token = sessionStorage.getItem("token");
    const rtoken = sessionStorage.getItem("rtoken");
    if (token === "undefined" || rtoken === "undefined" || !token || !rtoken)
      return <Navigate to="/" replace />;
  }
  return (
    <Home
      ProductList1={ProductList?.ProductList1 ? ProductList?.ProductList1 : []}
      ProductList2={ProductList?.ProductList2 ? ProductList?.ProductList2 : []}
    />
  );
};

export default HomeIndex;
