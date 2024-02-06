import axios from "axios";
import { baseurl } from "./constants";
import { getUser } from "./userService";

// const config = {
//   headers: {
//     Authorization: "Bearer " + getUser().token,
//     "Content-Type": "multipart/form-data",
//   },
// };
const createProduct = async (productDetails) => {
  try {
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("description", productDetails.description);
    formData.append("brand", productDetails.brand);
    formData.append("image", productDetails.image);

    const response = await axios.post(
      `${baseurl}/products/createproduct`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + getUser()?.token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error while creating product (Client)" + error);
    return error.response.data.message;
  }
};

const getProducts = async () => {
  try {
    const response = await axios.get(`${baseurl}/products/getproducts`, {
      headers: {
        Authorization: "Bearer " + getUser()?.token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log("error while creating product (Client)" + error);
    return error;
  }
};

export { createProduct, getProducts };
