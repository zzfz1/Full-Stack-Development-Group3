import { loginFailed, loginStart, loginSuccess } from "./userRedux";
import { publicProductsRequest } from "../utils/axios";
import { useDispatch } from "react-redux";

/* export const getALLProducts = async () => {
  const dispatch = useDispatch();
  console.log("the call is works");
  const res = await publicProductsRequest.get("/products");
  console.log("the products", res);
  try {
  } catch (error) {}
};
 */
