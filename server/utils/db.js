import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/e-commerce";

const connectDataBase = async () => {
  await mongoose.connect(MONGO_URI).then(() => {
    console.log(`Connected to MONGO DB`);
  });
};

export default connectDataBase;
