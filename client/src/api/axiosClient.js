import axios from "axios";

const axiosClient = axios.create({
  baseURL: "stock-management-system-three-beta.vercel.app", // backend base URL
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
