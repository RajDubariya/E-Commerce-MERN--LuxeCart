import { signUp } from "@/utils/authService";
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
import { Checkbox } from "../../ui/checkbox";
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
    name: z.string(),
    phone: z.string().min(10, {
      message: "Enter Valid Phone Number !!",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long !!",
    }),
    confirmPassword: z.string(),
    isSeller: z.boolean(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "Passwords do not match !!", path: ["confirmPassword"] }
  );

const Register = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      isSeller: false,
    },
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await signUp(values);
      if (response.status !== 200) {
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
      <div className="w-full h-screen flex flex-col items-center justify-center p-4">
        <span className="mb-3">
          <Logo />
        </span>

        <Card className="md:w-96 w-80">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Get Your New Account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="pb-2">
                      <FormControl>
                        <Input type="text" placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="pb-2">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                <FormField
                  control={form.control}
                  name="isSeller"
                  render={({ field }) => (
                    <FormItem className="pb-2">
                      <FormControl>
                        <>
                          <Checkbox
                            id="isSeller"
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="isSeller"
                            className="text-sm font-medium opacity-70 leading-none pl-2 capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Wanna be a seller ?
                          </label>
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Link to="/" className="text-xs underline">
                  Already have an account ?
                </Link>
                {isLoading ? (
                  <Button disabled className="w-full mt-2">
                    <Spinner />
                    Registering
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-2">
                    Sign Up
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
