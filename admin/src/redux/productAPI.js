// src/api/productAPI.js
const API_BASE_URL = "http://localhost:5000";

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const data = await response.json();
  return data;
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  const data = await response.json();
  return data;
};

export const updateProduct = async (slug, product) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

export const deleteProduct = async (slug) => {
  await fetch(`${API_BASE_URL}/products/${slug}`, {
    method: "DELETE",
  });
};

export const createProduct = async (product) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

export const createProductReview = async (slug, review) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  const data = await response.json();
  return data;
};
