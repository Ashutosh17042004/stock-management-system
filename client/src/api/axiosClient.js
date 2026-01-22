import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://stock-management-system-backend-d27h.onrender.com", // backend base URL
});

// Attach token automatically if present
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
