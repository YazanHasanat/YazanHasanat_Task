import axios from "axios";
import type { ApiError } from "../types/api";
export const apiClient = axios.create({
  baseURL: "/", 
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const apiError: ApiError = {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error occurred. Please try again.",
      status: error?.response?.status,
    };

    return Promise.reject(apiError);
  }
);

