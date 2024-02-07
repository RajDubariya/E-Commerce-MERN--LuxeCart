import { setUser } from "@/redux/reducers/authReducer";
import { login } from "@/utils/authService";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { Input } from "../ui/input";
import Logo from "./Logo";
import Spinner from "./Spinner";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ phone: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (credentials.password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await login(credentials);

      if (response.status !== 200) {
        setError(response);
      }
      if (response.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data));
      }

      dispatch(setUser(response.data));
      navigate("/home");
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
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
            <CardTitle>Login</CardTitle>
            <CardDescription>Login To Your Account</CardDescription>
          </CardHeader>
          <CardContent>
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

            <Link to="/signup" className="text-xs underline">
              Do not have an account ?
            </Link>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <Spinner />
                Logging You In...
              </Button>
            ) : (
              <Button className="w-full" onClick={handleLogin}>
                Login
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
}

export default Login;
