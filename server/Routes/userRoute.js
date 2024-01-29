import express from "express";
import { loginUser, registerUser } from "../Controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);

export { userRoute };
