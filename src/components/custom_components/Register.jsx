import { signUp } from "@/utils/authService";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import Logo from "./Logo";
import Spinner from "./Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (credentials.password !== confirmPassword) {
        setIsLoading(false);
        setError("Passwords do not match");
        return;
      }
      const response = await signUp(credentials);

      if (response.status !== 200) {
        setError(response);
        setIsLoading(false);
      }
      if (response.status === 200) {
        navigate("/");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("error during regestring:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center p-4 relative">
        <span className="absolute top-[3.5rem]">
          <Logo />
        </span>

        <Card className="md:w-96 w-80">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Get Your New Account</CardDescription>
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
              className="my-2"
              type="text"
              placeholder="Your Phone Number"
              value={credentials.phone}
              onChange={(e) =>
                setCredentials({ ...credentials, phone: e.target.value })
              }
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
              className="my-2"
              type="password"
              placeholder="Your Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex items-center py-1">
              <Checkbox
                id="isSeller"
                checked={credentials.isSeller}
                // onCheckedChange={() => setIsSeller(!isSeller)}
                onCheckedChange={() =>
                  setCredentials({
                    ...credentials,
                    isSeller: !credentials.isSeller,
                  })
                }
              />
              <label
                htmlFor="isSeller"
                className="text-sm font-medium opacity-70 leading-none pl-2 capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wanna be a seller ?
              </label>
            </div>
            <Link to="/" className="text-xs underline">
              Already have an account ?
            </Link>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <Spinner />
                Registering...
              </Button>
            ) : (
              <Button className="w-full" onClick={handleSubmit}>
                Sign Up
              </Button>
            )}
          </CardFooter>
        </Card>

        {error && (
          <Alert
            className="md:w-96 w-80 absolute bottom-4"
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

export default Register;
