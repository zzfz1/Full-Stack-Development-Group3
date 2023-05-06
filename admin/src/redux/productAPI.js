import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

// for testing set a token in the local storage
localStorage.setItem(
  "authToken",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM4MDI3MTBjOTllZjVjNDhhNTZmNTUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODIwNzY3NTksImV4cCI6MTY4NDY2ODc1OX0.u6aGLEc7avyetBNeealg9CnG4m6_euC3FLDcfZlMZSw"
);

export const getAllProductsAPI = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error geting categories:", error);
    throw error;
  }
};

export const getProductBySlugAPI = async (slug) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/${slug}`, config);
    return response.data;
  } catch (error) {
    console.error("Error geting category by slug:", error);
    throw error;
  }
};

export const createProductAPI = async (blankData) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API_URL}/`, blankData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const editProductAPI = async (oldslug, updatedProduct) => {
  console.log("oldslugAPI: ", oldslug);
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/${oldslug}`, updatedProduct, config);
    return response.data;
  } catch (error) {
    console.error("Error editing category:", error);
    throw error;
  }
};

export const deleteProductAPI = async (slug) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API_URL}/${slug}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
