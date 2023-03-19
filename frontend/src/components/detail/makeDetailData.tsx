import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./page";
import { productDetail } from "./types";
import genProductDetail from "./genProductDetail";

const MakeDetailData = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<productDetail | null>(
    null
  );
  const [signed, setSigned] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    genProductDetail({
      productDetail: productDetail,
      setProductDetail: setProductDetail,
      documnet_id: id ? id : "404",
    });
  }, []);
  useEffect(() => {
    if (productDetail)
    {
      setSigned(productDetail.signed);
      setText(productDetail.title);
      setProgress(productDetail.signature_count);
      setIsAuthor(productDetail.is_auther);
      setIsLoad(true);
    }
  },[productDetail])
  useEffect(()=>{
    console.log(isAuthor);
  },[isAuthor]);
  if (isLoad === false)
    return <>Loading...</>
  return <ProductDetail 
    document_id={productDetail?.document_id ? productDetail?.document_id : 0}
    title={text}
    thumbnail={productDetail?.thumbnail ? productDetail?.thumbnail : ""}
    signature_count={progress}
    description={productDetail?.description ? productDetail?.description : ""}
    author_id={productDetail?.author_id ? productDetail?.author_id : "Mr.hong"}
    is_author={isAuthor}
    signed={signed}
    setTitle={setText}
    setProgress={setProgress}
    setSigned={setSigned}
    />;
};

export default MakeDetailData;
