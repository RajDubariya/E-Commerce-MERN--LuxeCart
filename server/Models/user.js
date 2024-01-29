import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
