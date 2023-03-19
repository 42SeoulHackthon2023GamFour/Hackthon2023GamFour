import React from "react";
import { Link } from "react-router-dom";
import { Product } from "./types";
import "./home.css";

const ProductCard = ({ productList }: { productList: Product[] }) => {
  return (
    <>
      {productList.map((product: Product) => (
        <Link
          to={`/detail/${product.document_id}`}
          key={product.document_id}
          className="detail-link"
        >
          <div className="product-card">
            <img
              className="product-card__image"
              src={product.thumbnail}
              alt={product.title}
            />
            <h2 className="product-card__title">{product.title}</h2>
            <div className="product-progress">
              <div
                className="product-progress-bar"
                style={{ width: product.signature_count + "%" }}
              />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProductCard;
