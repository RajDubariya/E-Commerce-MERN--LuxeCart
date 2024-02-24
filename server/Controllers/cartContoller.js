import Cart from "../Models/cart.js";

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error(`error while getting user cart (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId });
    }

    const exitingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!exitingItem) {
      cart.items.push({ productId });
    }

    await cart.populate({
      path: "items.productId",
    });

    // cart.totalQuantity = cart.items.reduce(
    //   (total, item) => total + item.quantity,
    //   0
    // );
    // cart.totalPrice = cart.items.reduce(
    //   (total, item) => total + item.productId.price * item.quantity,
    //   0
    // );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(`error while adding item to  cart (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found for the user" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    await cart.populate({
      path: "items.productId",
    });

    cart.totalQuantity = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(`error while removing item from cart (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { quantity, userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the item in the cart
    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in the cart" });
    }

    cartItem.quantity = quantity;

    await cart.populate({
      path: "items.productId",
    });

    cart.totalQuantity = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
};
