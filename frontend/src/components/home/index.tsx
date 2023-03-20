import { Product, ProductLists, genProductListProps } from "./types";
import React, { useEffect, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import Home from "./page";
import genProductList from "./genProductList";
import { apiRequest } from "../../lib/apiRequest";

interface ProfileData {
  userid: number;
  username: string;
  userhash: string;
}

const callProfile = async () => {
  try {
    const response = await apiRequest.getProfile();
    return response.data;
  } catch (e: any) {}
};

const genUsername = (props: ProfileData) => {
  const Response = callProfile();
  let productDetail: ProfileData;
  Response.then((data) => {
    if (data?.username) {
      return data.username;
    }
    return null;
  });
};

const HomeIndex = () => {
  //username
  const [username, genUsername ] = useState<string | null>(null);
  useEffect(() => {
      genUsername(username);
  }, []);
  //ProductList
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
  const { token, rtoken } = params;
  if (token !== undefined && rtoken !== undefined) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rtoken");
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("rtoken", rtoken);
    window.history.pushState("", "", "/home");
  } else {
    const token = sessionStorage.getItem("token");
    const rtoken = sessionStorage.getItem("rtoken");
    if (token === "undefined" || rtoken === "undefined" || !token || !rtoken)
      return <Navigate to="/" replace />;
  }
  return (
    <Home
      username={username? username : null}
      ProductList={ProductList? ProductList : []}
    />
  );
};

export default HomeIndex;
