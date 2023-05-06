import axios from "axios";
// import { publicRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailure } from "./loginAdminSlice";

const API_URL = "http://localhost:3000/api/users/login";

// export const loginAdminAPI = async (loginInput) => {
// try {
//   const email = loginInput.email;
//   const password = loginInput.password;
//   const userJSONpost = { email, password }
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
//   const response = await axios.post(`${API_URL}`, userJSONpost, config);
//   // console.log('respones', response, 'dat', response.data);
//   return response.data;
// } catch (error) {
//   console.error("Error creating category:", error);
//   throw error;
// }
// };

// import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
      credentials: 'include'
    }
    const res = await axios.post(`${API_URL}`, user, config);
    console.log('respones', res, 'dat', res.data);
    // return res.data;


    // const res = await publicRequest.post("/", user);
    // console.log('user', res.data.isAdmin);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};