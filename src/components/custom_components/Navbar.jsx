import { getProductSuggestionOnSearch } from "@/utils/productService";
import { getUser, removeUser } from "@/utils/userService";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Logo from "./Logo";
import User from "./User";
import { Turn as Hamburger } from "hamburger-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [query, setQuery] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    removeUser();
    navigate("/");
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const fetchProducts = async () => {
    const response = await getProductSuggestionOnSearch(query);
    setSuggestedProducts(response);
  };

  useEffect(() => {
    if (query.trim() !== "") {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="px-4 py-3">
      <nav className="border border-slate-300 bg-white  rounded-full p-3 px-6 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center w-[30%]">
          <HoverCard>
            <HoverCardTrigger className="w-full">
              <Input
                type="text"
                placeholder="Search Product ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border border-slate-300"
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-[28rem] p-2">
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
                            className="mix-blend-multiply h-[5rem]"
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

        <div className="md:flex hidden items-center">
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

        <div className="md:hidden flex items-center">
          <span onClick={toggleMobileMenu} className="rounded-full">
            <Hamburger toggled={isMobileMenuOpen} toggle={setMobileMenuOpen} />
          </span>
        </div>
      </nav>

      {/* Mobile Menu Section */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 border mt-3 rounded-lg flex flex-col items-center">
          <div className="w-full mb-4">
            <HoverCard>
              <HoverCardTrigger className="w-full">
                <Input
                  type="text"
                  placeholder="Search Product ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border border-slate-300"
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-[28rem] p-2">
                {suggestedProducts.length > 0 && (
                  <>
                    {suggestedProducts?.map((product) => (
                      <>
                        <div
                          key={product?._id}
                          className="w-full p-2 rounded-md cursor-pointer hover:bg-gray-50 flex"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigate(`/product/${product._id}`);
                          }}
                        >
                          <div className="w-[20%]">
                            <img
                              className="mix-blend-multiply h-[5rem]"
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
          {user?.isSeller ? (
            <div className="mb-4">
              <Button
                onClick={() => {
                  closeMobileMenu();
                  navigate("/seller");
                }}
                className="capitalize"
                variant="outline"
              >
                Seller Panel
              </Button>
            </div>
          ) : null}

          <div className="mb-4">
            <Button
              onClick={() => {
                closeMobileMenu();
                navigate("/cart");
              }}
              variant="outline"
              className="p-2 rounded-full relative"
            >
              <ShoppingCartIcon />
            </Button>
          </div>

          <User />

          <Button className="w-[50%] mt-4" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
