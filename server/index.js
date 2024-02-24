import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDataBase from "./utils/db.js";
import fileUpload from "express-fileupload";
import { userRoute } from "./Routes/userRoute.js";
import { productRoute } from "./Routes/productRoute.js";
import { categoryRoute } from "./Routes/categoryRoute.js";
import { cartRoute } from "./Routes/cartRoute.js";

const port = process.env.PORT || 8000;
const app = express();

// Database connection
connectDataBase();

// uses
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
