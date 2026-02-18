
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api") + "/users";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ email, password }) => {
  return axiosInstance.post("/login", { email, password });
};


export const signupUser = ({ username, email, password }) => {
  return axiosInstance.post("/signup", { username, email, password });
};

export const logoutUser = () => {
  axiosInstance.get("/logout");
};


// Check current user (call /me)
export const getCurrentUser = async () => {
  return axiosInstance.get("/check"); // returns { authenticated: true, data: user }
};

// Change Password (/reset)
export const resetPassword = async ({ oldPassword, newPassword }) => {
  return axiosInstance.patch("/reset", { oldPassword, newPassword });
};
