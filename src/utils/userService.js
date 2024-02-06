export const getUser = () => {
  let user = localStorage.getItem("User");
  user = JSON.parse(user);
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem("User");
};
