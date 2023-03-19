import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scrambler from "../effects/textScreamble";
import { productDetail } from "./types";
import "./detail.css";
import signChange from "./signChange";

const ProductDetail = (productDetail: productDetail | null) => {
  const history = useNavigate();
  const [signed, setSigned] = useState<boolean>(
    productDetail?.signed ? productDetail.signed : false
  );
  const [text, setText] = useState<string>(productDetail?.title ? productDetail?.title : "Title");
  const [progress, setProgress] = useState<number>(
    productDetail?.signature_count ? productDetail?.signature_count : 0
  );
  const scramblerRef = useRef(new Scrambler());
  useEffect(() => {
    scramblerRef.current.scramble(text, setText);
  }, []);

  const handleLikeClick = () => {
    setSigned(!signed);
    if (!signed) setProgress((prevProgress) => prevProgress + 1);
    if (signed) setProgress((prevProgress) => prevProgress - 1);
    signChange(
      signed,
      productDetail?.document_id ? productDetail?.document_id : 404
    );
  };
  const handleGoBack = () => {
    history("/home");
  };

  return (
    <div className="product-detail-container">
      <div className="middle-container">
        {productDetail ? (
          <div className="description">
            <h1>{text}</h1>
            <img
              src={productDetail.thumbnail}
              alt={productDetail.title}
              className="product-image"
            />
            <p>{productDetail.description}</p>
            <div className="product-progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
        <div className="button-container">
          <button className="like-button" onClick={handleLikeClick}>
            {signed ? "UnSign" : "Sign"}
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
