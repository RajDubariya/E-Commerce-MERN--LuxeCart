import { getUserCart } from "@/utils/cartService";
import { useEffect, useState } from "react";
import CartItemCard from "./CartItems";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const getCart = async () => {
    try {
      const cart = await getUserCart();
      setCart(cart);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Navbar />
      <p className="ml-3 mt-2 text-2xl font-semibold">Your Cart</p>
      {cart?.items?.length > 0 ? (
        <div className="flex md:flex-row flex-col p-3 gap-3">
          <div className="md:w-[85%]">
            <CartItemCard items={cart?.items} getCart={getCart} />
          </div>

          <div className="md:w-[15%] p-4 border h-fit rounded-md shadow-md">
            <p className="text-xl font-semibold">
              Subtotal : <sup>₹</sup>
              {cart?.totalPrice}
            </p>
            <p className="text-xl font-semibold my-1">
              Total Quantity : {cart?.totalQuantity}
            </p>
            <Separator className="my-3" />
            <Button className="capitalize w-full">proceed to buy</Button>
          </div>
        </div>
      ) : (
        <p className="p-2 text-center text-3xl font-semibold">
          Your Cart Is Empty
        </p>
      )}
    </>
  );
};

export default Cart;
