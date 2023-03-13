import React from "react";
import "../../styles/home/home.css";
import { Link } from "react-router-dom";

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
    <div className="home">
      <Link to="/write" className="write-button">
        Write
      </Link>
      <div className="product-list">
      {productList.map((product) => (
          <Link key={product.id} to={`/detail/${product.id}`} className="product">
            <img src={product.thumbnail} alt={product.name} />
            <h3>{product.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
