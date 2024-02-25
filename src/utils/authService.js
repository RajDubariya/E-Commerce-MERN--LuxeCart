import axios from "axios";
import { baseurl } from "./constants";

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseurl}/users/login`, credentials);

    return response;
  } catch (error) {
    console.log("error while loging (Client)" + error);
    return error.response.data.message;
  }
};

const signUp = async (credentials) => {
  try {
    const response = await axios.post(`${baseurl}/users/register`, credentials);

    if (response.status === 200) {
      let userdata = response.data;
      userdata = JSON.stringify(userdata);
      localStorage.setItem("User", userdata);
    }

    return response;
  } catch (error) {
    console.log("error while regestering (Client)" + error);
    return error.response.data.message;
  }
};
const updateDetails = async (credentials) => {
  try {
    const response = await axios.put(
      `${baseurl}/users/updateuser`,
      credentials
    );
    return response;
  } catch (error) {
    console.log("error while updating user details (Client)" + error);
    return error.response.data.message;
  }
};

// const getUserDetails = async (phone) => {
//   try {
//     const response = await axios.get(`${baseurl}/users/getuser/${phone}`);

//     return response.data;
//   } catch (error) {
//     console.log("error while fetching user details (Client)" + error);
//     return error;
//   }
// };

export { login, signUp, updateDetails };
