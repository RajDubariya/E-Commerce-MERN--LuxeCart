import axios from "axios";
import { baseurl } from "./constants";
import { getUser } from "./userService";

const userId = getUser()?.userId;

const getUserCart = async () => {
  try {
    const response = await axios.get(`${baseurl}/cart/getcart/${userId}`);
    return response.data;
  } catch (error) {
    console.log("error while fetching user cart (Client)" + error);
    return error;
  }
};

const deleteCartItem = async (productId) => {
  try {
    const response = await axios.delete(
      `${baseurl}/cart/removeitemfromcart/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.log("error while deleting cart item (Client)" + error);
    return error;
  }
};

const addItemToCart = async (productId) => {
  try {
    const response = await axios.post(`${baseurl}/cart/add`, {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.log("error while adding item to cart (Client)" + error);
    return error;
  }
};

const updateCartItemQuantity = async (productId, quantity) => {
  try {
    console.log(productId, quantity);
    const response = await axios.put(`${baseurl}/cart/updateitemquantity`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.log("error while updating item quantity in cart (Client)" + error);
    return error;
  }
};
export { addItemToCart, deleteCartItem, getUserCart, updateCartItemQuantity };
