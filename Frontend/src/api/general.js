import axios from "axios";

const API_BASE_URL = "https://library-backend-wib5.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // send cookies for auth
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchHomeData = async () => {
  try {
    const response = await axiosInstance.get('/');
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};
