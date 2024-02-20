import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDataBase from "./utils/db.js";
import { userRoute } from "./Routes/userRoute.js";
import { productRoute } from "./Routes/productRoute.js";
import fileUpload from "express-fileupload";
import { categoryRoute } from "./Routes/categoryRoute.js";

const port = process.env.PORT;
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

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
