import api from "../Configs/api";

const fetchUserLogin = () => api.get("users");

const authorizationUser = (response, userData) =>
  response.data.find(
    (user) =>
      user.email === userData.email && user.password === userData.password
  );

const userRegister = (userData) => api.post("users", userData);

export { fetchUserLogin, authorizationUser, userRegister };
