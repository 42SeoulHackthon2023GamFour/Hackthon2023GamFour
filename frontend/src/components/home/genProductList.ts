import React, { useEffect, useCallback } from "react";
import { Product, ProductLists } from "./types";
import { apiRequest } from "../../lib/apiRequest";

interface genProductListProps {
  ProductList: ProductLists | null;
  setProductLists: React.Dispatch<React.SetStateAction<ProductLists | null>>;
}

const callList = async () => {
  try {
    const response = await apiRequest.getProductList();
    return response.data;
  } catch (e: any) {}
};

const genProductList = (props: genProductListProps) => {
  const Response = callList();
  let ResponseList: Product[];
  let ProductList1: Product[] = [];
  let ProductList2: Product[] = [];
  let result: ProductLists = { ProductList1, ProductList2 };
  Response.then((data) => {
    if (data) {
      ResponseList = data;
    }
    for (const element of ResponseList) {
      if (element.signature_count > 50)
        ProductList1.push(element);
      else
        ProductList2.push(element);
    }
    result = { ProductList1, ProductList2 };
    props.setProductLists(result);
  });
};

export default genProductList;
