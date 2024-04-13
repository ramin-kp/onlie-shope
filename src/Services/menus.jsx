import api from "../Configs/api";

const getSubMenus = async () => {
  const response = await api.get("menus");
  return await response.data;
};

export { getSubMenus };
