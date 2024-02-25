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
  address: {
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
