import express from "express";
import { authenticateToken } from "../utils/authenticateToken.js";
import {
  createProduct,
  getProductById,
  getProducts,
  rateProduct,
} from "../Controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/createproduct", authenticateToken, createProduct);
productRoute.get("/getproducts", authenticateToken, getProducts);
productRoute.get("/getproduct/:productId", authenticateToken, getProductById);
productRoute.put("/rateproduct/:productId", authenticateToken, rateProduct);

export { productRoute };
