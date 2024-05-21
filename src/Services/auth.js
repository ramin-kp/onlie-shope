import api from "../Configs/api";

const fetchUserLogin = () => api.get("users");

const userRegister = (userData) => api.post("users", userData);

export { fetchUserLogin, userRegister };
