import { login } from "@/utils/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import Logo from "../Logo";
import Spinner from "../Spinner";

const formSchema = z
  .object({
    phone: z.string().min(10, {
      message: "Enter Valid Phone Number !!",
    }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "Passwords do not match !!", path: ["confirmPassword"] }
  );

function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "", password: "" },
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);

      const response = await login(values);

      if (response.status === 200) {
        localStorage.setItem("User", JSON.stringify(response.data));
        navigate("/home");
      }

      setIsLoading(false);
      return;
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="pb-2">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="pb-2">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="pb-2">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link to="/signup" className="text-xs underline">
                  Do not have an account ?
                </Link>
                {isLoading ? (
                  <Button disabled className="w-full mt-2">
                    <Spinner />
                    Logging You In...
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-2">
                    Login
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login;
