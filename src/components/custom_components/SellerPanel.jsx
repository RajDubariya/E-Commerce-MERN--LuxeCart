import { getCategories } from "@/utils/categoryService";
import { createProduct } from "@/utils/productService";
import { AlertCircle, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
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

const SellerPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
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
        <Navbar />
        diplay seller products
        <div>No products</div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute bottom-10 right-10 border border-gray-300 rounded-full p-2.5 cursor-pointer flex items-center justify-center">
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
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label>Category</Label>
                {/* <Select
                  onValueChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      category: e.target.value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.map((category) => (
                        <SelectItem key={category?._id} value={category?.name}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}

                <select
                  className="border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                  onChange={(e) =>
                    setProductDetails({
                      ...productDetails,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
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
