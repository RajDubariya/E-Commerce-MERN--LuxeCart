import axios from "axios";
import { baseurl } from "./constants";
import { getUser } from "./userService";

const config = {
  headers: {
    Authorization: "Bearer " + getUser()?.token,
    "Content-Type": "multipart/form-data",
  },
};

const getCategories = async () => {
  try {
    const response = await axios.get(
      `${baseurl}/category/getcategories`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching categories (Client)" + error);
    return error;
  }
};



export { getCategories };
