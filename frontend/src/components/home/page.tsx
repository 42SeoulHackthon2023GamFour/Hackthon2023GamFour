import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScramblerComponent from "../effects/Scrambler";
import "./home.css";

interface Product {
  id: number;
  name: string;
  thumbnail: string;
}

const productList: Product[] = [
  {
    id: 1,
    name: "Product 1",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 2,
    name: "Product 2",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 3,
    name: "Product 3",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 4,
    name: "Product 4",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 5,
    name: "Product 5",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 6,
    name: "Product 6",
    thumbnail: "https://via.placeholder.com/150x150",
  },
];

const productList2: Product[] = [
  {
    id: 1,
    name: "Product 1",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 2,
    name: "Product 2",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 3,
    name: "Product 3",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 4,
    name: "Product 4",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 5,
    name: "Product 5",
    thumbnail: "https://via.placeholder.com/150x150",
  },
  {
    id: 6,
    name: "Product 6",
    thumbnail: "https://via.placeholder.com/150x150",
  },
];

const Home = () => {
  useEffect(() => {
    scrollRef.current!.scrollTop = 150;
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="container">
      <div className="header">
        <div className="sub-header">
          <h1><ScramblerComponent text={"Product List"}/></h1>
          <p><ScramblerComponent text={"Hi, User!"}/></p>
          <Link to="/write" className="write-button">
            Make Offer
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="product-list">
          {productList.map((product: Product) => (
            <Link
              to={`/detail/${product.id}`}
              key={product.id}
              className="detail-link"
            >
              <div className="product-card">
                <img
                  className="product-card__image"
                  src={product.thumbnail}
                  alt={product.name}
                />
                <h2 className="product-card__title">{product.name}</h2>
                <div className="product-progress">
                  <div
                    className="product-progress-bar"
                    style={{ width: `50%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="product-list2" ref={scrollRef}>
          {productList2.map((product: Product) => (
            <Link
              to={`/detail/${product.id}`}
              key={product.id}
              className="detail-link"
            >
              <div className="product-card">
                <img
                  className="product-card__image"
                  src={product.thumbnail}
                  alt={product.name}
                />
                <h2 className="product-card__title">{product.name}</h2>
                <div className="product-progress">
                  <div
                    className="product-progress-bar"
                    style={{ width: `50%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
