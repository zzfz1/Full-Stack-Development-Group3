import axios from "axios";

const BASE_USER_URL = "http://localhost:3000/api/users";
const BASE_PRODUCTS_URL = "http://localhost:3000/api/";
const BASE_ORDERS_URL = "http://localhost:3000/api/orders";

export const publicUserRequest = axios.create({
  baseURL: BASE_USER_URL,
});

export const publicProductsRequest = axios.create({
  baseURL: BASE_PRODUCTS_URL,
});

export const publicOrdersRequest = axios.create({
  baseURL: BASE_ORDERS_URL,
});
