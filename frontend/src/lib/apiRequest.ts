import { customAxios } from "./customAxios";

export const apiRequest = {
  getProductList: () => customAxios().get("/doc/list"),
  getDetails: (document_id: string) =>
    customAxios().get("/doc/detail/" + document_id),
  postWrite: (title: string, thumbnail: string, description: string) =>
    customAxios().post("/doc/write", {
      title: title,
      thumbnail: thumbnail,
      description: description,
    }),
  putSign: (document_id: string) =>
    customAxios().put("/doc/sign/" + document_id),
  putUnSign: (document_id: string) =>
    customAxios().put("/doc/unsign/" + document_id),
  deleteDocument: (document_id: string) =>
    customAxios().delete("/doc/delete/" + document_id),
};
