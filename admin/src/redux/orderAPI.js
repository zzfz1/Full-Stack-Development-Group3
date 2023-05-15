import axios from "axios";

const API_URL = "https://us-central1-web-shop-group-3.cloudfunctions.net/api/orders";

export const getAllOrdersAPI = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error geting orders:", error);
    throw error;
  }
};

export const getOrderBySlugAPI = async (slug) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(`${API_URL}/${slug}`, config);
    return response.data;
  } catch (error) {
    console.error("Error geting order by slug:", error);
    throw error;
  }
};

export const getOrderByIdAPI = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get(`${API_URL}/id/${id}`, config);
    console.log("getOrderByIdAPI ", response);
    return response.data;
  } catch (error) {
    console.error("Error getting order by id:", error);
    throw error;
  }
};

export const createOrderAPI = async (blankData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.post(`${API_URL}/`, blankData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrderAPI = async (id, updatedOrder) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    console.log("updatedOrder ", updatedOrder);
    const response = await axios.put(`${API_URL}/${id}`, updatedOrder, config);
    return response.data;
  } catch (error) {
    console.error("Error editing order:", error);
    throw error;
  }
};

export const deleteOrderAPI = async (_id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.delete(`${API_URL}/${_id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};
