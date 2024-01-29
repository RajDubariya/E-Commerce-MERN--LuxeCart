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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "@/utils/constants";
import Logo from "./Logo";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("User");
    if (user) {
      user = JSON.parse(user);
    }
    console.log(user);
  }, []);

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await axios.post(`${baseurl}/users/login`, {
        phone,
        password,
      });

      if (response.status === 200) {
        let userdata = response.data;
        userdata = JSON.stringify(userdata);
        localStorage.setItem("User", userdata);
      }
    } catch (error) {
      console.error("error during login :", error.response.data.message);
      setError(error.response.data.message);
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
            <CardTitle>Login</CardTitle>
            <CardDescription>Login To Your Account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              className="my-2"
              type="text"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            <Link to="/signup" className="text-xs underline">
              Do not have an account ?
            </Link>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Login
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
}

export default Login;
