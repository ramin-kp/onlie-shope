import api from "../Configs/api";

const getProductsData = () => api.get("products");

const removeProducts = (id) => api.delete(`products/${id}`);

const getProposal = () => api.get("proposal");

const postOrderDetails = (data) => api.post("orders", data);

export { getProductsData, removeProducts, getProposal, postOrderDetails };
