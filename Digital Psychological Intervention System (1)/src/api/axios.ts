import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle Token Expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If a request fails with 401 Unauthorized, we might need a refresh logic later.
    // Right now, simply reject it.
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - Token missing or expired.");
      // Optional: Handle auto-logout mechanism here
    }
    return Promise.reject(error);
  },
);

export default api;
