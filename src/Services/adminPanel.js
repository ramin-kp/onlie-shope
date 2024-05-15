import api from "./../Configs/api";

const getstoreData = () => api.get("storeData");

const getAllUsers = () => api.get("users");

const removeUser = (id) => api.delete(`users/${id}`);

const updateRoleUser = ({ userId, role }) =>
  api.patch(`users/${userId}`, { role });

export { getstoreData, getAllUsers, removeUser, updateRoleUser };
