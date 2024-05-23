import api from "../Configs/api";

const getAddress = () => api.get(`address`);
const postAddress = (data) => api.post("address", data);
const updateAddress = ({ id, data }) => api.put(`address/${id}`, data);

export { getAddress, postAddress, updateAddress };
