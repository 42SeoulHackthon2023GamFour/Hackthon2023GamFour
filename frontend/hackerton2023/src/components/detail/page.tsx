import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "../../styles/detail/detail.css";

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

  const [liked, setLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.imageUrl} alt={product.name} />
          <p>{product.description}</p>
        </>
      ) : (
        <p>Product not found.</p>
      )}
      <button className="like-button" onClick={handleLikeClick}>
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};
export default ProductDetail;
