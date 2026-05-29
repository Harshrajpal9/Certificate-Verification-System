
// export default API;
import axios from "axios";
import { authEvent } from "../utils/authEvent";

const API = axios.create({
  baseURL:  process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Attach access token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle expired/invalid token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // clear session
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("name");

      // notify React app
      authEvent.dispatchEvent(new Event("logout"));
    }
    return Promise.reject(error);
  }
);

export default API;