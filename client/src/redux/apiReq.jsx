import { loginFailed, loginStart, loginSuccess } from "./userRedux";
import { publicOrdersRequest, publicProductsRequest } from "../utils/axios";
import { useDispatch } from "react-redux";
import { setOrders } from "./orderRedux";

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
