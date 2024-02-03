import Product from "../Models/product.js";
import { cloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description, brand, rating } = req.body;
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
      height: 200,
      width: 300,
    });

    const newProduct = new Product({
      name,
      price,
      imageurl: result.secure_url,
      description,
      brand,
      rating,
    });

    await newProduct.save();

    res.status(200).json({
      productId: newProduct._id,
      name: newProduct.name,
      price: newProduct.price,
      imageurl: newProduct.imageurl,
      description: newProduct.description,
      brand: newProduct.brand,
      rating: newProduct.rating,
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

export { createProduct, getProducts };
