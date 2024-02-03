import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
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
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
