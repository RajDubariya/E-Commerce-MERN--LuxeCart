import axios from "axios";
import { baseurl } from "./constants";
import { getUser } from "./userService";

const config = {
  headers: {
    Authorization: "Bearer " + getUser()?.token,
    "Content-Type": "multipart/form-data",
  },
};

const createProduct = async (productDetails) => {
  try {
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("description", productDetails.description);
    formData.append("brand", productDetails.brand);
    formData.append("category", productDetails.category);
    formData.append("image", productDetails.image);
    formData.append("seller", getUser()?.userId);

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

const getProducts = async () => {
  try {
    const response = await axios.get(`${baseurl}/products/getproducts`, config);

    return response.data;
  } catch (error) {
    console.log("error while fetching products (Client)" + error);
    return error;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${baseurl}/products/getproduct/${productId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error while getting product with id (Client)" + error);
    return error;
  }
};

const rateProduct = async (id, rating) => {
  try {
    const response = await axios.put(
      `${baseurl}/products/rateproduct/${id}`,
      { rating },
      config
    );
    return response;
  } catch (error) {
    console.log("error while rating product (Client)" + error);
    return error;
  }
};

const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${baseurl}/category/getcategory/${category}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching products by category (Client)" + error);
    return error;
  }
};
const getProductBySeller = async () => {
  try {
    const response = await axios.get(
      `${baseurl}/products/getproducts/${getUser()?.userId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("error while fetching products by seller (Client)" + error);
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
  getProducts,
  getProductById,
  rateProduct,
  getProductsByCategory,
  getProductBySeller,
  deleteProduct,
  updateProduct,
};
