import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryByName,
} from "../Controllers/categoryController.js";

const categoryRoute = express.Router();

categoryRoute.post("/createcategory", createCategory);
categoryRoute.get("/getcategory/:category", getCategoryByName);
categoryRoute.get("/getcategories", getAllCategories);

export { categoryRoute };
