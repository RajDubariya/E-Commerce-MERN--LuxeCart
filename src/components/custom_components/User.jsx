import { getUser, removeUser } from "@/utils/userService";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";

const User = () => {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    removeUser();
    navigate("/");
  };
  const handleClick = () => {
    navigate("/updatedetails");
  };
  return (
    <>
      <HoverCard>
        <HoverCardTrigger onClick={handleClick} className="cursor-pointer">
          <Avatar>
            <AvatarFallback>
              {user?.name.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>
            <span className="flex items-center justify-between px-2">
              <p>Name</p>
              <p className=" capitalize">{user?.name}</p>
            </span>
            <Separator className="my-2" />
            <span className="flex items-center justify-between px-2">
              <p>Phone</p>
              <p>{user?.phone}</p>
            </span>
            <Separator className="my-2" />
            <span className="flex items-center justify-between px-2">
              <p>Email</p>
              <p>{user?.email}</p>
            </span>
            <Separator className="my-2" />
            <span className="flex items-center justify-between px-2">
              <p>Seller ?</p>
              <p>{user?.isSeller ? "Yes" : "No"}</p>
            </span>
            <Separator className="my-2" />
            <span className="flex items-center justify-between px-2 ">
              <Button className="w-full" onClick={logout}>
                Logout
              </Button>
            </span>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default User;
