// src/config/api.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8082";

const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 10000,
  HEADERS: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
};

console.log(
  "=====================================API Base URL==========================",
  BASE_URL
);

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

export const logConfig = () => {
  console.log("API Configuration:", API_CONFIG);
};

export default API_CONFIG;
