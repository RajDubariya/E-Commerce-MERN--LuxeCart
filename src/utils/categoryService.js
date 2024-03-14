import axios from "axios";
import { baseurl, config } from "./constants";

const getCategories = async (url) => {
  try {
    const response = await axios.get(`${baseurl}/category/${url}`, config);

    return response.data;
  } catch (error) {
    console.log("error while fetching categories (Client)" + error);
    return error;
  }
};

export { getCategories };
