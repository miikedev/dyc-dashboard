import axios from "axios";

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || ""; // Fallback to empty string
const UPLOAD_API_BASE_URL = import.meta.env.VITE_UPLOAD_API_BASE_URL || ""; // Fallback to empty string
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; // Fallback to empty string

const IS_PRODUCTION = import.meta.env.VITE_ENV === "production";
console.log(IS_PRODUCTION);
console.log(API_BASE_URL);

// Create Axios instance
const api = axios.create({
  baseURL: IS_PRODUCTION ? API_BASE_URL : "/api",
});

const authApi = axios.create({
  baseURL: IS_PRODUCTION ? AUTH_API_BASE_URL : "/auth",
});

const uploadApi = axios.create({
  baseURL: IS_PRODUCTION ? UPLOAD_API_BASE_URL : "/upload",
});

// URL construction function
const constructApiUrl = (path) => {
  return `${IS_PRODUCTION ? API_BASE_URL : ""}${path}`;
};

const constructAuthUrl = (path) => {
  return `${IS_PRODUCTION ? AUTH_API_BASE_URL : ""}${path}`;
};

const constructUploadUrl = (path) => {
  return `${IS_PRODUCTION ? UPLOAD_API_BASE_URL : ""}${path}`;
};

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Uncommented the refreshToken logic if needed
// const refreshToken = async () => { ... }

// Response Interceptor: Handle 401 Errors & Refresh Token
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       const originalRequest = error.config;

//       // Prevent infinite loops
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         const newAccessToken = await refreshToken();

//         if (newAccessToken) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { api, authApi, uploadApi, constructApiUrl, constructAuthUrl, constructUploadUrl };
