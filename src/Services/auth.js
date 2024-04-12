import api from "../Configs/api";

const userLogin = async (userData) => {
  const response = await api.get("users");
  const hasUser = response.data.find((user) => {
    return user.email === userData.email && user.password === userData.password;
  });
  return hasUser;
};
const userRegister = async (userData) => {
  
  await api.post("users", { ...userData });
};

export { userLogin, userRegister };
