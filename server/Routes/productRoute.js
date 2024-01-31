import express from "express";
import { authenticateToken } from "../utils/authenticateToken.js";
import { createProduct } from "../Controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/createproduct", authenticateToken, createProduct);

export { productRoute };
