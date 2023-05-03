import axios from "axios";

const API_URL = "http://localhost:3000/api/users/login";
const TOKEN = JSON.parse(localStorage.getItem("persist:root"));

// console.log('TOKEN', JSON.parse(localStorage.getItem("persist:root")))
// console.log('TOKEN1', JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user))
// console.log('TOKEN2', JSON.parse(JSON.parse(localStorage.getItem("persist:root"))).currentUser)
// console.log('TOKEN3', JSON.parse(TOKEN.user).currentUser.isAdmin)
console.log('tk', TOKEN);

export const publicRequest = axios.create({
  baseURL: API_URL,
});

// export const userRequest = axios.create({
//   baseURL: API_URL,
//   headers: { token: `Bearer ${JSON.parse(TOKEN.user).currentUser}` },
// });