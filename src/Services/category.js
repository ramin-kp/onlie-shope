import api from "../Configs/api";

const getCategory = () => api.get("category");

const removeCategory = (id) => api.delete(`category/${id}`);

const createCategory = (newCategory) => api.post(`category`, newCategory);

const getCategoryProducts = () => api.get("categoryProducts");

export { getCategory, removeCategory, createCategory, getCategoryProducts };
