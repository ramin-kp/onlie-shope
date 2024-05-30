import api from "../Configs/api";

const fetchUserLogin = () => api.get("users");
const userRegister = (userData) => api.post("users", userData);
const getUserById = (id) => api.get(`users/${id}`);
const updateUserById = ({ id, data }) => api.patch(`users/${id}`, data );

export { fetchUserLogin, userRegister, getUserById, updateUserById };
