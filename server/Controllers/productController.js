import Product from "../Models/product.js";
import { cloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description, brand } = req.body;
    const file = req.files?.image;

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
      brand,
    });

    await newProduct.save();

    res.status(200).json({
      productId: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      imageurl: newProduct.imageurl,
      description: newProduct.description,
      brand: newProduct.brand,
      ratings: newProduct.ratings,
    });
  } catch (error) {
    console.error(`error while creating product (backend)`);
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
    const product = await Product.findById(productId);

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
    let { rating } = req.body;
    rating = Number(rating);

    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { ratings: rating },
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
export { createProduct, getProducts, rateProduct, getProductById };
