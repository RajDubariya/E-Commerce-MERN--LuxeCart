import {
  deleteProduct,
  getProductById,
  rateProduct,
  updateProduct,
} from "@/utils/productService";
import { getUser } from "@/utils/userService";
import { Check, ShoppingCart, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { addItemToCart } from "@/utils/cartService";

const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [updateProductDetails, setUpdateProductDetails] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { productId } = useParams();

  const user = getUser();

  const fetchProduct = async () => {
    try {
      const response = await getProductById(productId);

      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const renderStars = (product) => {
    const sumOfRatings = product?.ratings?.reduce(
      (total, rating) => total + rating,
      0
    );
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
      await rateProduct(id, rating);

      // After successfully rating, fetch the product again
      await fetchProduct();
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
      await fetchProduct();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addItemToCartClick = async () => {
    try {
      await addItemToCart(productId);
      setIsAddedToCart(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        {user?.isSeller && product?.seller === user?.userId ? (
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
            <img className="h-[400px]" src={product?.imageurl} alt="" />
          </div>

          <div className="mt-5 md:mt-0">
            <h1 className="text-4xl font-semibold tracking-wider capitalize">
              {product?.name}
            </h1>
            <p className="my-2 text-xl font-normal text-gray-700 ">
              <sup>₹</sup>
              {product?.price}
            </p>
            <div className="md:w-[70%] py-2 tracking-wide">
              <p>{product?.description}</p>
            </div>
            <p className="py-1 font-semibold">Brand : {product?.brand}</p>
            <div className="py-1 text-sm ">
              Category :
              <Badge
                onClick={() => navigate(`/category/${product?.category.name}`)}
                variant="secondary"
                className="text-md cursor-pointer"
              >
                {product?.category.name}
              </Badge>
            </div>
            <div className="flex items-center py-1">
              {product?.numberOfRatings > 0 ? (
                renderStars(product)
              ) : (
                <TiStarOutline className="text-yellow-400" size={22} />
              )}
              <Badge variant="outline">{product?.numberOfRatings}</Badge>
            </div>
            <div className="flex capitalize items-center py-1 mb-2">
              <p>rate this product : </p>
              <input
                className="w-[8%] border rounded-md border-gray-200 p-1 ml-2"
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

            {user?.isSeller && product?.seller !== user?.userId && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
