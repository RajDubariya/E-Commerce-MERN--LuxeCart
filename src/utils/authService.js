import axios from "axios";
import { baseurl } from "./constants";

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

const authUser = async (url, params) => {
  try {
    const response = await axios.post(`${baseurl}/users/${url}`, params);
    return response;
  } catch (error) {
    console.log(error);
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

export { updateDetails, authUser };
