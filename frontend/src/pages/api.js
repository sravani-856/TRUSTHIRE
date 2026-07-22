import axios from "axios";

// Single place to change the backend URL — set REACT_APP_API_URL in your
// .env file for staging/production, falls back to localhost for dev.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

// Automatically attach the auth token (if present) to every request,
// so individual components no longer need to read localStorage and
// build the Authorization header themselves.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;