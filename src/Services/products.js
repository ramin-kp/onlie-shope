import api from "../Configs/api";

const getProductsData = () => api.get("products")


export {getProductsData}