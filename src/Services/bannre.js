import api from "../Configs/api";

const fetchBanners = () => api.get("banners");

export { fetchBanners };
