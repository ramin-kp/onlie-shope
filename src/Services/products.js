import api from "../Configs/api";

const getProductsData = () => api.get("products")
const getProposal = () => api.get("proposal")

export {getProductsData,getProposal}