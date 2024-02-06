import { getUser, logoutUser } from "@/utils/userService";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const User = () => {
  const user = getUser();

  

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{user?.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <span className="flex items-center justify-between px-2">
              <p>Name</p>
              <p>{user?.name}</p>
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
              <Button className="w-full" onClick={logoutUser}>
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
