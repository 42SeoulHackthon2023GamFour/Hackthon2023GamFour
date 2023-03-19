import React from "react";
import { productDetail } from "./types";
import { apiRequest } from "../../lib/apiRequest";

interface genProductDetailProps {
  productDetail: productDetail | null;
  setProductDetail: React.Dispatch<React.SetStateAction<productDetail | null>>;
  documnet_id: string;
}

const callDetail = async (document_id: string) => {
  try {
    const response = await apiRequest.getDetails(document_id);
    return response.data;
  } catch (e: any) {}
};

const genProductDetail = (props: genProductDetailProps) => {
  const Response = callDetail(props.documnet_id);
  let productDetail: productDetail;
  Response.then((data) => {
    if (data) {
      productDetail = data;
    }
    props.setProductDetail(productDetail);
  });
};

export default genProductDetail;
