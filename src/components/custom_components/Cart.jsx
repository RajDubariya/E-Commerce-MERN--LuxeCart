import { getUserCart } from "@/utils/cartService";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import CartItemCard from "./CartItems";

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
      <p className="ml-3 mt-2 text-2xl font-semibold">Your Cart</p>
      {cart?.items?.length > 0 ? (
        <div className="flex md:flex-row flex-col p-3 gap-3">
          <div className="md:w-[85%]">
            <CartItemCard items={cart?.items} getCart={getCart} />
          </div>

          <div className="md:w-[15%] p-4 border h-fit rounded-md shadow-md text-md md:text-sm lg:text-md xl:text-xl">
            <p>Total Items : {cart?.items.length}</p>
            <Separator className="my-1" />
            <p>
              Subtotal : <sup>₹</sup>
              {cart?.totalPrice}
            </p>
            <Separator className="my-1" />
            <p>Total Quantity : {cart?.totalQuantity}</p>
            <Separator className="my-1 mb-3" />
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
