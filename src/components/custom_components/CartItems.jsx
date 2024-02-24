import { deleteCartItem, updateCartItemQuantity } from "@/utils/cartService";
import { truncateText } from "@/utils/constants";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

const CartItemCard = ({ items, getCart }) => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  const handleClick = (id) => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };
  const handleItemDelete = async (productId) => {
    try {
      await deleteCartItem(productId);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await updateCartItemQuantity(productId, quantity);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid gap-5">
        {items &&
          items?.map((item) => (
            <div key={item._id}>
              <div className="bg-white border border-gray-200 rounded-md shadow-md p-2 flex md:flex-row flex-col">
                <div className="flex justify-center items-center p-3 md:w-[30%] lg:w-[50%] xl:w-[20%]">
                  <img
                    src={item.productId.imageurl}
                    alt={item.productId.name}
                    className="mix-blend-multiply h-[9rem]"
                  />
                </div>
                <div className="p-3">
                  <h5 className="text-lg tracking-wide font-semibold text-gray-900 capitalize">
                    {item.productId.name}
                  </h5>
                  <p>{truncateText(item.productId.description)}</p>
                  <p className="my-2 text-sm tracking-tight font-normal text-gray-700 ">
                    <sup>₹</sup>
                    {item.productId.price}
                  </p>

                  <div className="flex items-center">
                    <select
                      className="border mr-1 border-gray-200 p-1 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      onChange={(e) => {
                        const newQuantities = { ...quantities };
                        newQuantities[item?.productId?._id] = e.target.value;
                        setQuantities(newQuantities);
                        updateQuantity(item?.productId?._id, e.target.value);
                      }}
                      value={quantities[item?.productId?._id] || 0}
                    >
                      <option value="0">Quantity</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                    <Button
                      onClick={() => handleItemDelete(item?.productId?._id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                  <p className="capitalize text-sm my-2">
                    selected quantity : {item?.quantity}
                  </p>
                  <span
                    onClick={() => handleClick(item?.productId?._id)}
                    className="text-xs cursor-pointer hover:underline hover:text-blue-500"
                  >
                    More Details
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

CartItemCard.propTypes = {
  items: PropTypes.array.isRequired,
  getCart: PropTypes.func.isRequired,
};

export default CartItemCard;
