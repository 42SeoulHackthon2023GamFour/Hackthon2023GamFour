import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScramblerComponent from "../effects/Scrambler";
import "./home.css";
import ProductCard from "./productCard";
import { Product, ProductLists } from "./types";

const productList: Product[] = [
  {
    document_id: "1",
    title: "Product 1",
    thumbnail: "https://via.placeholder.com/150x150",
    signature_count: 20,
  },
  {
    document_id: "2",
    title: "Product 2",
    thumbnail: "https://via.placeholder.com/150x150",
    signature_count: 20,
  },
  {
    document_id: "3",
    title: "Product 3",
    thumbnail: "https://via.placeholder.com/150x150",
    signature_count: 20,
  },
  {
    document_id: "4",
    title: "Product 4",
    thumbnail: "https://via.placeholder.com/150x150",
    signature_count: 20,
  },
  {
    document_id: "5",
    title: "Product 5",
    thumbnail: "https://via.placeholder.com/150x150",
    signature_count: 20,
  },
  {
    document_id: "6",
    title: "Product 6",
    thumbnail: "https://via.placeholder.com/150x150",
    signature_count: 20,
  },
];

const Home = (ProductLists: ProductLists | null) => {
  const ProductList1 = ProductLists?.ProductList1
    ? ProductLists?.ProductList1
    : productList;
  const ProductList2 = ProductLists?.ProductList2
    ? ProductLists?.ProductList2
    : productList;
  useEffect(() => {
    scrollRef.current!.scrollTop = 150;
  }, [ProductList2]);
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="container">
      <div className="header">
        <div className="sub-header">
          <h1>
            <ScramblerComponent text={"Product List"} />
          </h1>
          <p>
            <ScramblerComponent text={"Hi, User!"} />
          </p>
          <Link to="/write" className="write-button">
            Make Offer
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="product-list">
          <ProductCard productList={ProductList1} />
        </div>
        <div className="product-list2" ref={scrollRef}>
          <ProductCard productList={ProductList2} />
        </div>
      </div>
    </div>
  );
};

export default Home;
