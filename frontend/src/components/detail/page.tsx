import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scrambler from "../effects/textScreamble";
import { productDetail } from "./types";
import "./detail.css";
import signChange from "./signChange";
import docDelete from "./docDelete";
import { apiRequest } from "../../lib/apiRequest";

interface productDetailData {
  document_id: number;
  title: string;
  thumbnail: string;
  signature_count: number;
  description: string;
  author_id: string;
  is_author: boolean;
  signed: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ProductDetail = (productDetail: productDetailData) => {
  const history = useNavigate();
  const scramblerRef = useRef(new Scrambler());
  const username = sessionStorage.getItem("username");
  const [isAdmin, setIsAdmin] = useState(false);
  if (username === "joupark") setIsAdmin(true);
  useEffect(() => {
    scramblerRef.current.scramble(productDetail.title, productDetail.setTitle);
  }, []);

  const username = sessionStorage.getItem("username");
  let isAdmin = username === "joupark";

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  if (textareaRef && textareaRef.current) {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }

  const handleLikeClick = () => {
    productDetail.setSigned(!productDetail.signed);
    if (!productDetail.signed)
      productDetail.setProgress((prevProgress) => prevProgress + 1);
    if (productDetail.signed)
      productDetail.setProgress((prevProgress) => prevProgress - 1);
    signChange(productDetail.signed, productDetail.document_id);
  };
  const handleGoBack = () => {
    history("/home");
  };

  const handleDeleteClick = () => {
    docDelete(productDetail.document_id);
    history("/home");
  };

  const adminSign = async () => {
    for (let i = 0; i < 10; i++)
      await apiRequest.putDSign(productDetail.document_id + "");
    history("/home");
  };

  return (
    <div className="product-detail-container">
      <div className="middle-container">
        {productDetail ? (
          <div className="description">
            <h1>{productDetail.title}</h1>
            <img
              src={productDetail.thumbnail}
              alt={productDetail.title}
              className="product-image"
            />
            <textarea
              ref={textareaRef}
              className="product-description"
              value={productDetail.description}
              disabled={true}
            />
            <div className="product-progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${productDetail.signature_count}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
        <div className="button-container">
          {productDetail.is_author ? (
            <button className="like-button" onClick={handleDeleteClick}>
              Delete
            </button>
          ) : (
            <button className="like-button" onClick={handleLikeClick}>
              {productDetail.signed ? "UnSign" : "Sign"}
            </button>
          )}
          {isAdmin ? (
<<<<<<< HEAD
            <button className="button" onClick={adminSign}>
              AdminSign
            </button>
          ) : null}
=======
            <button className="button" onClick={admainSign}>
              admainSign
            </button>
          ) : (
            null
          )}
>>>>>>> 33e36ad ([TEST] REACT_QUERY 추가 테스트)
          <button className="button" onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
