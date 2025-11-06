// src/__api__/axiosInstance.js
import axios from "axios";
import API_CONFIG from "./config";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Attach token with custom header
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = sessionStorage.getItem("auth");
    if (auth) {
      try {
        const { token } = JSON.parse(auth);
        if (token) {
          config.headers["X-Auth-Token"] = token;
        }
      } catch (e) {
        console.error("Error parsing auth from sessionStorage:", e);
      }
    }

    // No Redux store dispatching here
    return config;
  },
  (error) => {
    // Just reject the error (no Redux)
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Handle 401 and other responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response directly (no Redux)
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("auth");
      window.location.replace("/User/login");
    } else {
      console.error(
        "Response error:",
        error.response?.data?.message || error.message
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
