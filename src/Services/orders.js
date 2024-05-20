import api from "../Configs/api";

const getOrders = () => api.get("orders");
const getOrderDetails = (id) => api.get(`orders/${id}`);
const removeOrder = (id) => api.delete(`orders/${id}`);
const changeStatusOrder = ({ orderId, newOrder }) =>
  api.put(`orders/${orderId}`, { ...newOrder });

export { getOrders, getOrderDetails, removeOrder, changeStatusOrder };
