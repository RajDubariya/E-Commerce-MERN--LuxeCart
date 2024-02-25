import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updateUserDetails,
} from "../Controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/getuser/:phone", getUser);
userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/updateuser", updateUserDetails);

export { userRoute };
