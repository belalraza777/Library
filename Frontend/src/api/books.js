import axios from "axios";

const API_BASE_URL = "https://library-backend-wib5.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // send cookies for auth
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllBooks = async () => {
  try {
    const response = await axiosInstance.get('/books');
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error fetching all books:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const addNewBook = async (bookData) => {
  try {
    const response = await axiosInstance.post('/books', bookData);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error("Error adding new book:", error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await axiosInstance.patch(`/books/${id}`, bookData);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axiosInstance.delete(`/books/${id}`);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    return { success: false, message: error.response?.data?.message || error.message, error: error.response?.data?.error || error.message };
  }
};
