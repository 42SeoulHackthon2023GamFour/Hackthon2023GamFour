import React from "react";
import { Link } from "react-router-dom";
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

const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Product List</h1>
        <Link to="/write" className="button">
          Write
        </Link>
      </div>
      <div className="product-list">
        {productList.map((product: Product) => (
          <Link to={`/detail/${product.id}`} key={product.id}>
            <div className="product-card">
              <img
                className="product-card__image"
                src={product.thumbnail}
                alt={product.name}
              />
              <h2 className="product-card__title">{product.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
