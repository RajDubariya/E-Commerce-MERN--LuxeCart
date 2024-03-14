export const getUser = () => {
  let user = localStorage.getItem("User");
  user = JSON.parse(user);
  return user;
};
