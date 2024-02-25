import { getUser } from "@/utils/userService";
import { ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Logo from "./Logo";
import User from "./User";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <>
      <nav className="border-b p-3 px-6 flex items-center justify-between">
        <Logo />
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
