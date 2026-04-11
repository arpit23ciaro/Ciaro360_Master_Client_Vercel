import axios from "axios";
import { superAdminLogin } from "../../config";

const instance = axios.create({
  baseURL: "http://192.168.0.236:4444",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const post = (data) => {
  try {
    const result = instance.post(superAdminLogin, data);
    return console.log(result.data);
  } catch (error) {
    return console.error("Error sending data:", error);
  }
};

export default instance;


// // apiService.js
// import axios from 'axios'; // or fetch, depending on your preference

// // Configure your API base URL and other settings
// const API_BASE_URL = 'http://192.168.0.236:4444/';

// // Create an axios instance (if you're using axios)
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,

// });

// // Handle responses and errors globally
// apiClient.interceptors.response.use(
//   response => response.data,
//   error => {
//     // Handle errors globally
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Define your API calls
// export const get = (url, params = {}) => apiClient.get(url, { params });
// export const post = (url, data = {}) => apiClient.post(url, data);
// export const put = (url, data = {}) => apiClient.put(url, data);
// export const del = (url) => apiClient.delete(url);
