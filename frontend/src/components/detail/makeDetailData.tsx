import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./page";
import { productDetail } from "./types";
import genProductDetail from "./genProductDetail";

const MakeDetailData = () => {
  const [productDetail, setProductDetail] = useState<productDetail | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    genProductDetail({
      productDetail: productDetail,
      setProductDetail: setProductDetail,
      documnet_id: id ? id : "404",
    });
  }, []);
  return <ProductDetail 
    document_id={productDetail?.document_id ? productDetail?.document_id : 404}
    title={productDetail?.title ? productDetail.title : "Title"}
    thumbnail={productDetail?.thumbnail ? productDetail?.thumbnail : "https://via.placeholder.com/150x150"}
    signature_count={productDetail?.signature_count ? productDetail?.signature_count : 0}
    description={productDetail?.description ? productDetail?.description : "empty"}
    author_id={productDetail?.author_id ? productDetail?.author_id : "Mr.hong"}
    signed={productDetail?.signed ? productDetail?.signed : false}
    />;
};

export default MakeDetailData;
