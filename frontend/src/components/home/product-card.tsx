import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  progress: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  thumbnailUrl,
  progress,
}) => {
  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <div className="product-thumbnail">
          <img src={thumbnailUrl} alt={title} />
        </div>
        <div className="product-title">{title}</div>
      </Link>
      <div className="product-progress">
        <div className="product-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProductCard;
