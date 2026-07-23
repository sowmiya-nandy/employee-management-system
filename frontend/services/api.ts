import axios, { AxiosRequestHeaders } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (!config.headers) {
      config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
    } else {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
