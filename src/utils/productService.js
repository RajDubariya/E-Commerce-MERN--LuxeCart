import axios from "axios";
import { baseurl } from "./constants";

const getToken = () => {
  let user = localStorage.getItem("User");
  user = JSON.parse(user);
  return user;
};

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
          Authorization: "Bearer " + getToken().token,
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

export { createProduct };
