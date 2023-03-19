import { apiRequest } from "../../lib/apiRequest";

const docDelete = async (document_id: number) => {
    try {
        await apiRequest.deleteDocument(document_id + "");
    } catch(e) {}
};

export default docDelete;
