import axios from "axios";

const API_URL = "http://localhost:3000/api/categories";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAllCategoriesAPI = async () => {
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const getCategoryBySlugAPI = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/${slug}`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting category by slug:", error);
    throw error;
  }
};

export const getCategoryByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/id/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting category by id:", error);
    throw error;
  }
};

export const createCategoryAPI = async (newCategory) => {
  try {
    const response = await axios.post(API_URL, newCategory, config);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const editCategoryAPI = async (oldslug, updatedCategory) => {
  try {
    const response = await axios.put(`${API_URL}/${oldslug}`, updatedCategory, config);
    return response.data;
  } catch (error) {
    console.error("Error editing category:", error);
    throw error;
  }
};

export const deleteCategoryAPI = async (slug) => {
  try {
    const response = await axios.delete(`${API_URL}/${slug}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
