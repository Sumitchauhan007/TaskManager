import axios from "axios";
import { BASE_URl } from "./apiPaths";

const axiosInstance  = axios.create({
    baseURL: BASE_URl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept:"application/json",
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const originalRequest = error.config;

      // Skip redirect if it's the login call
      if (error.response.status === 401 && !originalRequest.url.includes("/auth/login")) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;