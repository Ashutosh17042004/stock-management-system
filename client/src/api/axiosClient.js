import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api" // backend base URL
});

export default axiosClient;
