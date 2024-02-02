import axios from "axios";
import { baseurl } from "./constants";

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseurl}/users/login`, credentials);

    if (response.status === 200) {
      let userdata = response.data;
      userdata = JSON.stringify(userdata);
      localStorage.setItem("User", userdata);
    }

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

export { login, signUp };
