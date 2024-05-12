import api from "../Configs/api";

const getProductsData = () => api.get("products");

const getProposal = () => api.get("proposal");

const postOrderDetails = (data) => api.post("orders", data);

export { getProductsData, getProposal, postOrderDetails };
