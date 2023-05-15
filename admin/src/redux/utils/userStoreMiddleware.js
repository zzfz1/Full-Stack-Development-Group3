export const manageUserMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (["users/loginUser/fulfilled"].includes(action.type)) {
    localStorage.setItem("currentUser", JSON.stringify(store.getState().user.currentUser));
  }
  if (["users/getUserBySlug/fulfilled"].includes(action.type)) {
    localStorage.setItem("edittingUser", JSON.stringify(store.getState().user.edittingUser));
  }
  if (action.type === "users/logoutUser/fulfilled") {
    localStorage.removeItem("currentUser");
  }

  return result;
};
