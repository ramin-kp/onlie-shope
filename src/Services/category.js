import api from "../Configs/api";

const getCategory = () => api.get("/category");

export { getCategory };
