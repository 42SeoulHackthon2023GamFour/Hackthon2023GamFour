import { apiRequest } from "../../lib/apiRequest";

const countUp = async (document_id: string) => {
  try {
    const response = await apiRequest.putSign(document_id);
    console.log(response);
  } catch (e: any) {console.log(e)}
};

const countDown = async (document_id: string) => {
  try {
    const response = await apiRequest.putUnSign(document_id);
    console.log(response);
  } catch (e: any) {console.log(e)}
};

const signChange = (signed: boolean, document_id: number) => {
  if (!signed) countUp(document_id + "");
  else countDown(document_id + "");
};

export default signChange;
