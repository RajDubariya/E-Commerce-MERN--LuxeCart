import Product from "../Models/product.js";
import { cloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description, brand, rating } = req.body;
    const file = req.files.image;

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
    console.error(`error while creating product`);
    console.error(error);
    res.status(500).json(error);
  }
};

export { createProduct };
