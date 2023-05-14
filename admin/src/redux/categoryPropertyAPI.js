import axios from "axios";

const API_URL = "http://localhost:3000/api/categories";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createCategoryPropertyAPI = async (key) => {
  try {
    const response = await axios.post(`${API_URL}/properties/create`, { key }, config);
    return response.data;
  } catch (error) {
    console.error("Error creating category property:", error);
    throw error;
  }
};
export const getCategoryPropertiesAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/properties/all`, config);
    return response.data;
  } catch (error) {
    console.error("Error creating category property:", error);
    throw error;
  }
};

export const deleteCategoryPropertyAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/properties/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting category property:", error);
    throw error;
  }
};
