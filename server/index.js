import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDataBase from "./utils/db.js";
import { userRoute } from "./Routes/userRoute.js";

const app = express();

// Database connection
connectDataBase();

// uses
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
