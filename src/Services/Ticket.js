import api from "../Configs/api";

const sendTicket = () => api.post("ticket");

export { sendTicket };
