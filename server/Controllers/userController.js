import User from "../Models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
  const jwtkey = process.env.JWT_SECRET;

  return jwt.sign({ userId }, jwtkey);
};

const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password, isSeller } = req.body;

    let user = await User.findOne({ phone });

    if (user) {
      return res
        .status(400)
        .json({ message: "user with this phone number already registered" });
    }
    if (name === "") {
      return res.status(400).json({ message: "Please enter your name" });
    }

    if (!validator.isMobilePhone(phone, "en-IN")) {
      return res
        .status(400)
        .json({ message: "Please enter valid phone number" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter valid email address" });
    }

    if (password === "") {
      return res.status(400).json({ message: "Please enter a password" });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    user = new User({ name, phone, email, password: securePassword, isSeller });

    await user.save();

    res.status(200).json({
      userId: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isSeller: user.isSeller,
    });
  } catch (error) {
    console.error(`error while regestring user`);
    console.error(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    let user = await User.findOne({ phone: phone });

    if (!validator.isMobilePhone(phone, "en-IN")) {
      return res
        .status(400)
        .json({ message: "Please enter valid phone number" });
    }

    if (password === "") {
      return res.status(400).json({ message: "Please enter a password" });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this phone number is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password... !!" });
    }

    const token = createToken(user._id);

    res.status(200).json({
      userId: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isSeller: user.isSeller,
      token: token,
    });
  } catch (error) {
    console.error(`error login user`);
    console.error(error);
    res.status(500).json(error);
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { phone, name, email, address, password } = req.body;
    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res
        .status(404)
        .json({ error: "user not found with this phone number" });
    }

    if (email && !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter valid email address" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) {
      user.address.street =
        address.street !== "" ? address.street : user.address.street;
      user.address.city =
        address.city !== "" ? address.city : user.address.city;
      user.address.state =
        address.state !== "" ? address.state : user.address.state;
      user.address.zipCode =
        address.zipCode !== "" ? address.zipCode : user.address.zipCode;
    }

    if (password && password !== "") {
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);

      user.password = securePassword;
    }

    const updatedUser = await user.save({ new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(`error updating user`);
    console.error(error);
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { phone } = req.params;

    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res
        .status(404)
        .json({ error: "user not found with this phone number" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`error getting user`);
    console.error(error);
    res.status(500).json(error);
  }
};

export { registerUser, loginUser, updateUserDetails, getUser };
