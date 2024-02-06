import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertCircle, PlusIcon } from "lucide-react";
import { createProduct, getProducts } from "@/utils/productService";
import Spinner from "./Spinner";
import User from "./User";

const SellerPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    image: null,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const products = await getProducts();
        setProducts(products);
      };

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await createProduct(productDetails);
      if (response.status !== 200) {
        setError(response);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Product Creation failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen relative">
        <nav className="border-b p-3 px-6 flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl tracking-tight">Seller Panel</h3>
          <User />
        </nav>
        diplay seller products
        <div>No products</div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute bottom-10 right-10 border border-black rounded-full p-2.5 cursor-pointer flex items-center justify-center">
              <PlusIcon className="h-9 w-9" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[789px]">
            <DialogHeader>
              <DialogTitle>Publish A Product</DialogTitle>
              <DialogDescription className="capitalize">
                please fill up all necessary details needed for your product
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
                    setProductDetails({
                      ...productDetails,
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
                    setProductDetails({
                      ...productDetails,
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
                    setProductDetails({
                      ...productDetails,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="Brand"
                  className="col-span-3"
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      brand: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image">Image (required)</Label>
                <Input
                  id="image"
                  type="file"
                  className="col-span-3"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <DialogFooter>
              {isLoading ? (
                <Button disabled>
                  <Spinner />
                  Uploading ...
                </Button>
              ) : (
                <Button onClick={handleSubmit} type="submit">
                  Submit
                </Button>
              )}
            </DialogFooter>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default SellerPanel;
