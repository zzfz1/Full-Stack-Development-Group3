export const manageUserMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (["users/loginUser/fulfilled", "users/getUserBySlug/fulfilled"].includes(action.type)) {
    localStorage.setItem("currentUser", JSON.stringify(store.getState().user.currentUser));
  }

  if (action.type === "users/logoutUser/fulfilled") {
    localStorage.removeItem("currentUser");
  }

  return result;
};
