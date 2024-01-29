import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Checkbox } from "../ui/checkbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseurl } from "@/utils/constants";
import axios from "axios";
import Logo from "./Logo";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        setError("passwords do not match");
        return;
      }

      const response = await axios.post(`${baseurl}/users/register`, {
        name,
        phone,
        email,
        password,
        isSeller,
      });

      if (response.status === 200) {
        const userdata = response.data;
        console.log(userdata);
      }
    } catch (error) {
      console.error("error during login:", error.response.data.message);
      setError(error.response.data.message);
    }
  };

 

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center p-4 relative">
        <span className=" absolute top-[3.5rem]">
          <Logo />
        </span>
        <Card className="md:w-96 w-80">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Get Your New Account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="my-2"
              type="text"
              placeholder="Your Name"
            />
            <Input
              className="my-2"
              type="text"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-2"
              type="email"
              placeholder="Your Email"
            />
            <Input
              className="my-2"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                checked={isSeller}
                onCheckedChange={() => setIsSeller(!isSeller)}
              />
              <label
                htmlFor="isSeller"
                className="text-sm font-medium leading-none pl-2 capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Want to be a seller ?
              </label>
            </div>
            <Link to="/" className="text-xs underline">
              Already have an account ?
            </Link>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Sign Up
            </Button>
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
