import api from "../Configs/api";

const getProvinces = () => api.get("provinces");
const getCities = (id) => api.get("cities");

export { getProvinces, getCities };
