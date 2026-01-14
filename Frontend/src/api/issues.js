import axios from "axios";

const API_BASE_URL = "https://library-backend-wib5.onrender.com/api/issues";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // send cookies for auth
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllIssues = async () => {
  try {
    const response = await axiosInstance.get('/');
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error fetching all issues:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const issueBook = async (bookId) => {
  try {
    const response = await axiosInstance.post(`/${bookId}`);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error issuing book:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const getMyBooks = async () => {
  try {
    const response = await axiosInstance.get('/myBooks');
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error fetching my books:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const requestReturn = async (issueId) => {
  try {
    const response = await axiosInstance.post(`/request/${issueId}`);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error requesting return:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const approveReturn = async (issueId) => {
  try {
    const response = await axiosInstance.post(`/return/${issueId}`);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error approving return:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};
