import { getUser } from "@/utils/userService";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const User = () => {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    localStorage.removeItem("User");
    navigate("/");
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>
              {user?.name.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
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
        </PopoverContent>
      </Popover>
    </>
  );
};

export default User;
