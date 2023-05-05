import { loginFailed, loginStart } from "./userRedux";

export const login = async () => {
  dispatch(loginStart());
  try {
  } catch (error) {
    dispatch(loginStart());
  }
};
