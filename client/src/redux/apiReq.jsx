import { loginStart, loginSuccess } from "./userRedux";
import {
  publicOrdersRequest,
  publicProductsRequest,
  publicCategoriesRequest,
} from "../utils/axios";
import { allProduct } from "./productsRedux";
import { useDispatch } from "react-redux";
import { setOrders } from "./orderRedux";
import { setCategories } from "./categoryRedux";

/* export const getALLProducts = async () => {
  const dispatch = useDispatch();
  console.log("the call is works");
  const res = await publicProductsRequest.get("/products");
  console.log("the products", res);
  try {
  } catch (error) {}
};
 */

export const getMyOrders = async (userID) => {
  const dispatch = useDispatch();
  try {
    const res = await publicOrdersRequest.get(`/user/${userID}`, {
      withCredentials: true,
    });
    dispatch(setOrders(res.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const getAllCategories = async (userID) => {
  const dispatch = useDispatch();
  try {
    const res = await publicCategoriesRequest.get(``, {
      withCredentials: true,
    });
    dispatch(setCategories(res.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchProducts = async () => {
  const dispatch = useDispatch();
  try {
    const res = await publicProductsRequest.get("/products");
    console.log(res.data);
    dispatch(allProduct(res.data));
  } catch (error) {
    console.log(error);
  }
};
