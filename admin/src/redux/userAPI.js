import axios from "axios";

const API_URL = "https://us-central1-web-shop-group-3.cloudfunctions.net/api/users";

export const getAllUsersAPI = async () => {
  console.log("calledGetAllUses");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(API_URL, config);
    console.log("getAllUsersAPIresponse: ", response);
    return response.data;
  } catch (error) {
    console.error("Error geting users:", error);
    throw error;
  }
};

export const getUserBySlug = async (userSlug) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(`${API_URL}/${userSlug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
};

export const createUserAPI = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.put(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateUserAPI = async (userSlug, userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.put(`${API_URL}/update/${userSlug}`, userData, config);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUserAPI = async (userSlug) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.delete(`${API_URL}/${userSlug}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const loginUserAPI = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logoutUserAPI = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
