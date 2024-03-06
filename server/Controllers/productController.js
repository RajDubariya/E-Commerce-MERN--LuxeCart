import mongoose from "mongoose";
import Category from "../Models/category.js";
import Product from "../Models/product.js";
import { cloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description, brand, category, seller } = req.body;
    const file = req.files?.image;

    const foundCategory = await Category.findOne({ name: category });

    if (name === "" || price === "" || description === "" || brand === "") {
      return res.status(400).json({ message: "Please fillup all fields..." });
    }
    if (!file) {
      return res
        .status(400)
        .json({ message: "Please choose a image to upload...." });
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "products",
      gravity: "center",
    });

    const newProduct = new Product({
      name,
      price,
      imageurl: result.secure_url,
      description,
      seller,
      brand,
      category: foundCategory._id,
    });

    await newProduct.save();

    // save product to category's products arrray

    foundCategory.products.push(newProduct._id);
    await foundCategory.save();

    res.status(200).json({
      productId: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      imageurl: newProduct.imageurl,
      description: newProduct.description,
      brand: newProduct.brand,
      ratings: newProduct.ratings,
      category: newProduct.category,
      seller: newProduct.seller,
    });
  } catch (error) {
    console.error(`error while creating product (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(`error while deleting product (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (description) updatedFields.description = description;

    updatedFields.updated = Date.now();

    const product = await Product.findByIdAndUpdate(productId, updatedFields, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    console.error(`error while updating product (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(`error while fetching products`);
    console.error(error);
    res.status(500).json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate({
      path: "category",
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(`error while fetching single product`);
    console.error(error);
    res.status(500).json(error);
  }
};

const rateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    let { rating, postedby } = req.body;
    rating = Number(rating);

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { ratings: { rating, postedby } },
        $inc: { numberOfRatings: 1 },
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(`error while rating product`);
    console.error(error);
    res.status(500).json(error);
  }
};

const getProductBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await Product.find({ seller: sellerId });

    res.status(200).json(products);
  } catch (error) {
    console.error(`error while fetching products of seller`);
    console.error(error);
    res.status(500).json(error);
  }
};

const suggestProductOnQuery = async (req, res) => {
  try {
    const { query } = req.query;

    const suggestions = await Product.find({
      name: { $regex: new RegExp(query, "i") },
    });

    res.status(200).json(suggestions);
  } catch (error) {
    console.error(`error while suggesting products based on query`);
    console.error(error);
    res.status(500).json(error);
  }
};
export {
  createProduct,
  getProducts,
  rateProduct,
  getProductById,
  getProductBySeller,
  deleteProduct,
  updateProductDetails,
  suggestProductOnQuery,
};
