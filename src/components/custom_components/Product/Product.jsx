import { addItemToCart } from "@/utils/cartService";
import {
  deleteProduct,
  fetchProductData,
  rateProduct,
  updateProduct,
} from "@/utils/productService";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import Spinner from "../Spinner";
import ProductReviews from "./ProductReviews";
import SimilarProducts from "./SimilarProducts";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProduct } from "@/redux/reducers/productReducer";

const Product = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [review, setReview] = useState("");
  const [updateProductDetails, setUpdateProductDetails] = useState({
    name: "",
    price: "",
    description: "",
  });

  const { productId } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { singleProduct } = useSelector((state) => state.product);

  const fetchProduct = () => {
    try {
      fetchProductData(`getproduct/${productId}`).then((res) => {
        dispatch(setSingleProduct(res));
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const renderStars = (product) => {
    const sumOfRatings = product?.ratings?.reduce((total, ratingobj) => {
      const rating = ratingobj?.rating;
      return total + rating;
    }, 0);

    const avgRating = Math.floor(sumOfRatings / product?.numberOfRatings);

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
      const userRating = singleProduct.ratings.find(
        (rating) => rating.postedby === user.userId
      );

      if (userRating) {
        alert("You have already rated this product");
      } else {
        await rateProduct(id, rating, review, user?.userId);
        setReview("");
        setRating(0);
        // After successfully rating, fetch the product again
        fetchProduct();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDelete = () => {
    deleteProduct(productId);
    navigate("/seller");
  };

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    try {
      await updateProduct(productId, updateProductDetails);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addItemToCartClick = async () => {
    try {
      await addItemToCart(user?.userId, productId);
      setIsAddedToCart(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user?.isSeller && singleProduct?.seller === user?.userId ? (
        <div className="flex items-center p-3 justify-end">
          <Button onClick={handleDelete} variant="destructive">
            <Trash2Icon size={20} />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-3" variant="secondary">
                Update Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[789px]">
              <DialogHeader>
                <DialogTitle>Update Your Product</DialogTitle>
                <DialogDescription className="capitalize">
                  please fill up all you want to update
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateProductDetails({
                        ...updateProductDetails,
                        name: e.target.value,
                      })
                    }
                    value={updateProductDetails.name}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="Price (In INR)"
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateProductDetails({
                        ...updateProductDetails,
                        price: e.target.value,
                      })
                    }
                    value={updateProductDetails.price}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    className="col-span-3"
                    onChange={(e) =>
                      setUpdateProductDetails({
                        ...updateProductDetails,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                {isLoading ? (
                  <Button disabled>
                    <Spinner />
                    Updating...
                  </Button>
                ) : (
                  <Button onClick={handleUpdateProduct} type="submit">
                    Update
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-10 p-10">
        <div className="flex justify-center">
          <motion.img
            className="h-[500px]"
            src={singleProduct?.imageurl}
            alt={singleProduct?.name}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="mt-5 md:mt-0">
          <h1 className="text-4xl font-semibold text-slate-500 tracking-wider capitalize">
            {singleProduct?.name}
          </h1>
          <p className="my-2 text-xl font-normal text-gray-700 ">
            <sup>₹</sup>
            {singleProduct?.price}
          </p>
          <div className="md:w-[70%] py-2 tracking-wide text-slate-600 ">
            <p>{singleProduct?.description}</p>
          </div>
          <p className="py-1 font-semibold">Brand : {singleProduct?.brand}</p>
          <div className="py-1 text-sm flex items-center">
            <p>Category : </p>
            <Badge
              onClick={() =>
                navigate(`/category/${singleProduct.category?.name}`)
              }
              variant="secondary"
              className=" cursor-pointer"
            >
              {singleProduct?.category.name}
            </Badge>
          </div>
          <div className="flex items-center py-2">
            {singleProduct?.numberOfRatings > 0 ? (
              renderStars(singleProduct)
            ) : (
              <TiStarOutline className="text-yellow-400" size={22} />
            )}
            <Badge variant="outline">{singleProduct?.numberOfRatings}</Badge>
          </div>
          {/* rating */}
          {!(user.userId === singleProduct?.seller) && (
            <div className="flex flex-col capitalize justify-center py-2">
              <div className="flex">
                <p>rate this product : </p>
                <input
                  className="w-[8%] border rounded-md border-gray-200 p-1 ml-2"
                  defaultValue={0}
                  type="number"
                  min="0"
                  max="5"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                />
              </div>
              <div className="py-3">
                <Textarea
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Your Honest Review ..."
                  value={review}
                />
                <Button
                  onClick={() => handleRateClick(singleProduct?._id)}
                  className="mt-3"
                >
                  {isLoading ? <Spinner /> : "Rate"}
                </Button>
              </div>
            </div>
          )}

          {/* rating */}
          {singleProduct?.seller !== user?.userId && (
            <div>
              {isAddedToCart ? (
                <Button disabled className="bg-green-600 ">
                  <Check />
                </Button>
              ) : (
                <Button onClick={addItemToCartClick} className="capitalize">
                  <ShoppingCart size={22} className="mr-2" />
                  add to cart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <ProductReviews product={singleProduct} />
      <SimilarProducts productId={productId} />
    </>
  );
};

export default Product;
