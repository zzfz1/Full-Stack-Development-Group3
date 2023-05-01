import axios from "axios";

const API_URL = "http://localhost:3000/api/users/login";

export const loginAdminAPI = async (loginInput) => {
  try {
    const email = loginInput.email;
    const password = loginInput.password;
    const userJSONpost = { email, password }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await axios.post(`${API_URL}`, userJSONpost, config);
    console.log('respones', response, 'dat', response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
