import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductBySeller,
  getProducts,
  rateProduct,
  similarProducts,
  suggestProductOnQuery,
  updateProductDetails,
  getCategoryProductsByName,
} from "../Controllers/productController.js";
import { authenticateToken } from "../utils/authenticateToken.js";

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
productRoute.get("/similar/:productId", authenticateToken, similarProducts);
productRoute.get(
  "/category/:category",
  authenticateToken,
  getCategoryProductsByName
);

export { productRoute };
