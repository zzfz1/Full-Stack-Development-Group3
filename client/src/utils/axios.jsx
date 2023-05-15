import axios from "axios";

const BASE_USER_URL =
  "https://us-central1-web-shop-group-3.cloudfunctions.net/api/users";
const BASE_PRODUCTS_URL =
  "https://us-central1-web-shop-group-3.cloudfunctions.net/api/";
const BASE_ORDERS_URL = "http://localhost:3000/api/orders";
const BASE_CATEGORIES_URL =
  "https://us-central1-web-shop-group-3.cloudfunctions.net/api/categories";

export const publicUserRequest = axios.create({
  baseURL: BASE_USER_URL,
});

export const publicProductsRequest = axios.create({
  baseURL: BASE_PRODUCTS_URL,
});

export const publicOrdersRequest = axios.create({
  baseURL: BASE_ORDERS_URL,
});

export const publicCategoriesRequest = axios.create({
  baseURL: BASE_CATEGORIES_URL,
});
