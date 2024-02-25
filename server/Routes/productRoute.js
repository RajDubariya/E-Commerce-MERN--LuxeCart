import express from "express";
import { authenticateToken } from "../utils/authenticateToken.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductBySeller,
  getProducts,
  rateProduct,
  suggestProductOnQuery,
  updateProductDetails,
} from "../Controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/createproduct", authenticateToken, createProduct);
productRoute.get("/getproducts", authenticateToken, getProducts);
productRoute.get("/getproduct/:productId", authenticateToken, getProductById);
productRoute.put("/rateproduct/:productId", authenticateToken, rateProduct);
productRoute.put(
  "/updateproduct/:productId",
  authenticateToken,
  updateProductDetails
);
productRoute.delete(
  "/deleteproduct/:productId",
  authenticateToken,
  deleteProduct
);
productRoute.get(
  "/getproducts/:sellerId",
  authenticateToken,
  getProductBySeller
);
productRoute.get("/suggestproduct", authenticateToken, suggestProductOnQuery);

export { productRoute };
