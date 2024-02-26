import { getProductSuggestionOnSearch } from "@/utils/productService";
import { getUser } from "@/utils/userService";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import Logo from "./Logo";
import User from "./User";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [query, setQuery] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await getProductSuggestionOnSearch(query);
    setSuggestedProducts(response);
  };

  useEffect(() => {
    if (query.trim() !== "") {
      fetchProducts();
    }
  }, [query]);

  return (
    <>
      <nav className="border-b p-3 px-6 flex items-center justify-between">
        <Logo />

        <div className="flex items-center w-[30%]">
          <HoverCard>
            <HoverCardTrigger className="w-full">
              <Input
                type="text"
                placeholder="Search Product ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </HoverCardTrigger>
            <HoverCardContent className=" w-[28rem] p-2">
              {suggestedProducts.length > 0 && (
                <>
                  {suggestedProducts?.map((product) => (
                    <>
                      <div
                        key={product?._id}
                        className="w-full p-2 rounded-md cursor-pointer hover:bg-gray-50 flex"
                        onClick={() => {
                          navigate(`/product/${product._id}`);
                        }}
                      >
                        <div className="w-[20%]">
                          <img
                            className=" mix-blend-multiply h-[5rem]"
                            src={product.imageurl}
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <p>{product.name}</p>
                          <p>Brand : {product.brand}</p>
                        </div>
                      </div>

                      <Separator />
                    </>
                  ))}
                </>
              )}
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex items-center">
          {user?.isSeller ? (
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  onClick={() => {
                    navigate("/seller");
                  }}
                  className="capitalize mr-5"
                  variant="outline"
                >
                  seller panel
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="capitalize">
                click to open seller panel
              </HoverCardContent>
            </HoverCard>
          ) : null}

          <Button
            onClick={() => navigate("/cart")}
            variant="outline"
            className="p-2 rounded-full mr-5"
          >
            <ShoppingCartIcon />
          </Button>
          <span>
            <User />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
