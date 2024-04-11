import api from "../components/Configs/api";

const userLogin = async (userData) => {
  const response = await api.get("users");

  const hasUser = response.data.find((user) => {
    return user.email === userData.email && user.password === userData.password;
  });
  return hasUser;
};

export { userLogin };
