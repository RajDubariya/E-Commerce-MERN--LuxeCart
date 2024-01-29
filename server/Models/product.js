import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageurl: {
    type: String,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  rating: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
