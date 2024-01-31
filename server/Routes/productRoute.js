import express from "express";
import { authenticateToken } from "../utils/authenticateToken.js";
import {
  createProduct,
  getProducts,
} from "../Controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/createproduct", authenticateToken, createProduct);
productRoute.get("/getproducts", authenticateToken, getProducts);

export { productRoute };
