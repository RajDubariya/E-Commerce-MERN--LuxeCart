import { getUser } from "@/utils/userService";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Logo from "./Logo";
import User from "./User";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <>
      <nav className="border-b p-3 px-6 flex items-center justify-between">
        <Logo />
        <div className="flex">
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

          <div>
            <User />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
