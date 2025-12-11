// src/api/apiClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://65.1.134.8:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default api;
