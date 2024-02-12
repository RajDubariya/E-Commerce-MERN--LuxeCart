import { getProductById, rateProduct } from "@/utils/productService";
import { useEffect, useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import Spinner from "./Spinner";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  console.log(product);
  const fetch = async () => {
    try {
      const response = await getProductById(productId);

      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const renderStars = (product) => {
    const sumOfRatings = product?.ratings.reduce(
      (total, rating) => total + rating,
      0
    );

    const avgRating = Math.floor(sumOfRatings / product?.numberOfRatings);
    console.log(avgRating);
    const stars = [];
    for (let i = 0; i < avgRating; i++) {
      stars.push(
        <TiStarFullOutline key={i} className="text-yellow-400" size={22} />
      );
    }
    return stars;
  };

  const handleRateClick = async (id) => {
    setIsLoading(true);

    try {
      rateProduct(id, rating);
      // After successfully rating, fetch the product again
      await fetch();
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        <div className="grid md:grid-cols-2 p-10">
          <div className="flex justify-center">
            <img className="w-[50%]" src={product?.imageurl} alt="" />
          </div>

          <div className="mt-5 md:mt-0">
            <h1 className="text-4xl font-semibold tracking-wider">
              {product?.name}
            </h1>
            <p className="my-2 text-xl font-normal text-gray-700 ">
              <sup>₹</sup>
              {product?.price}
            </p>
            <div className="w-[50%] py-2 tracking-wide">
              <p>{product?.description}</p>
            </div>
            <p className="py-1 font-semibold">Brand : {product?.brand}</p>
            <div className="flex items-center py-1">
              {product?.numberOfRatings > 0 ? (
                renderStars(product)
              ) : (
                <TiStarOutline className="text-yellow-400" size={22} />
              )}
              <p>{product?.numberOfRatings}</p>
            </div>
            <div className="flex capitalize items-center py-1">
              <p>rate this product : </p>
              <input
                className="w-[6%] border rounded-md border-gray-200 p-1 ml-2"
                defaultValue={0}
                type="number"
                min="0"
                max="5"
                onChange={(e) => setRating(e.target.value)}
              />

              <Button
                onClick={() => handleRateClick(product?._id)}
                size="sm"
                className="ml-2"
              >
                {isLoading ? <Spinner /> : "Rate"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
