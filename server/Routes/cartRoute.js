import express from "express";
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../Controllers/cartContoller.js";

const cartRoute = express.Router();

cartRoute.get("/getcart/:userId", getUserCart);
cartRoute.post("/add", addItemToCart);
cartRoute.delete("/removeitemfromcart/:userId/:productId", removeItemFromCart);
cartRoute.put("/updateitemquantity", updateCartItemQuantity);

export { cartRoute };
