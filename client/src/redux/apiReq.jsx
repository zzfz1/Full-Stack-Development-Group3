import { loginFailed, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../utils/axios";
import { useDispatch } from "react-redux";

export const login = async () => {
  const dispatch = useDispatch();
  dispatch(loginStart());
  const res = await publicRequest.post("/login", user);
  try {
  } catch (error) {
    dispatch(loginStart());
  }
};
