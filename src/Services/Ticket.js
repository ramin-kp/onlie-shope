import api from "../Configs/api";

const getTicket = () => api.get("ticket");
const sendTicket = (data) => api.post("ticket", data);
const removeTicket = (id) => api.delete(`ticket/${id}`);

const answerTicketData = ({ id, newTicketData }) => api.put(`ticket/${id}`, newTicketData);

export { getTicket, sendTicket, removeTicket, answerTicketData };
