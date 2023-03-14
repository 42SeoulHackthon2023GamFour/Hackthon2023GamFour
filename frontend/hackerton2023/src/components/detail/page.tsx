import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Scrambler from "../effects/textScreamble";

import "./detail.css";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  likes: number;
}

const productData: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "https://via.placeholder.com/500x300",
    likes: 10,
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    imageUrl: "https://via.placeholder.com/500x300",
    likes: 5,
  },
  {
    id: 3,
    name: "Product 3",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x300",
    likes: 2,
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? productData.find((p) => p.id === parseInt(id)) : null;
  const history = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);
  const [text, setText] = useState("Product Title");
  const scramblerRef = useRef(new Scrambler());
  useEffect(() => {
    // call scramble function with the text to be scrambled and handler.
    scramblerRef.current.scramble(text, setText);
  }, []);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const handleGoBack = () => {
    history("/home");
  };

  return (
    <div className="product-detail-container">
      <div className="middle-container">
        {product ? (
          <div className="description">
            <h1>{text}</h1>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <p>{product.description}</p>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
        <div className="button-container">
          <button className="like-button" onClick={handleLikeClick}>
            {liked ? "UnSign" : "Sign"}
          </button>
          <button className="button" onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
