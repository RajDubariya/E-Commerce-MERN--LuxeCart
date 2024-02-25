import { updateDetails } from "@/utils/authService";
import { getUser } from "@/utils/userService";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import Navbar from "./Navbar";
import Spinner from "./Spinner";

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [credentials, setCredentials] = useState({
    phone: getUser()?.phone,
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (credentials.password !== confirmPassword) {
        setIsLoading(false);
        setError("Passwords do not match");
        return;
      }

      const response = await updateDetails(credentials);

      if (response.status !== 200) {
        setError(response);
        setIsLoading(false);
      }

      if (response.status === 200) {
        setIsUpdated(true);
        navigate("/");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("error during updating your details:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center p-4 relative h-[90vh]">
        <Card className="w-full lg:w-[80%] xl:w-[60%]">
          <CardHeader>
            <CardTitle>Update Your Details</CardTitle>
            <CardDescription className="capitalize text-red-400">
              *fill up fields you want to update
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={credentials.name}
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              className="my-2"
              type="text"
              placeholder="Your Name"
            />

            <Input
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="my-2"
              type="email"
              placeholder="Your Email"
            />
            {/* address */}
            <div className="flex gap-4">
              <div className="flex flex-col md:flex-row  w-full md:gap-4">
                <Input
                  className="my-1"
                  type="text"
                  placeholder="Street"
                  value={credentials.address.street}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      address: {
                        ...credentials.address,
                        street: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  className="my-1"
                  type="text"
                  placeholder="City"
                  value={credentials.address.city}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      address: {
                        ...credentials.address,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row w-full md:gap-4">
                <Input
                  className="my-1"
                  type="text"
                  placeholder="State"
                  value={credentials.address.state}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      address: {
                        ...credentials.address,
                        state: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  className="my-1"
                  type="text"
                  placeholder="Zip Code"
                  value={credentials.address.zipCode}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      address: {
                        ...credentials.address,
                        zipCode: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <Input
              className="my-2"
              type="password"
              placeholder="Your Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Your Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <Spinner />
                Updating...
              </Button>
            ) : isUpdated ? (
              <Button disabled className="w-full bg-green-500 text-white">
                <Check />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="w-full">
                Update
              </Button>
            )}
          </CardFooter>
        </Card>

        {error && (
          <Alert
            className="md:w-96 w-80 absolute bottom-0"
            variant="destructive"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default UpdateUserForm;
