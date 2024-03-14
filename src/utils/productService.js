import axios from "axios";
import { baseurl, config } from "./constants";

const createProduct = async (productDetails, userId) => {
  try {
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("description", productDetails.description);
    formData.append("brand", productDetails.brand);
    formData.append("category", productDetails.category);
    formData.append("image", productDetails.image);
    formData.append("seller", userId);

    const response = await axios.post(
      `${baseurl}/products/createproduct`,
      formData,
      config
    );
    return response;
  } catch (error) {
    console.log("error while creating product (Client)" + error);
    return error.response.data.message;
  }
};

const fetchProductData = async (url, params) => {
  try {
    const response = await axios.get(
      `${baseurl}/products/${url}`,
      config,
      params
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const rateProduct = async (id, rating, review, userId) => {
  try {
    const response = await axios.put(
      `${baseurl}/products/rateproduct/${id}`,
      { rating, postedby: userId, review },
      config
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log("error while rating product (Client)" + error);
    return error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${baseurl}/products/deleteproduct/${productId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error while deleting product (Client)" + error);
    return error;
  }
};

const updateProduct = async (productId, updateProductDetails) => {
  try {
    const response = await axios.put(
      `${baseurl}/products/updateproduct/${productId}`,
      updateProductDetails,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error while updating product (Client)" + error);
    return error;
  }
};

export {
  createProduct,
  rateProduct,
  deleteProduct,
  updateProduct,
  fetchProductData,
};
