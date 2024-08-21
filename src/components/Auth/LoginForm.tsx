"use client";
import * as z from "zod";
import { LoginSchema } from "../../../schema";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginIcon } from "../Icons/Login";

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <CardWrapper headerLabel="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      {...field}
                      placeholder="admin"
                      type="text"
                      className="active:ring-teal-200 focus-visible:ring-teal-200"
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
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      {...field}
                      placeholder="••••••"
                      type="password"
                      className="active:ring-teal-200 focus-visible:ring-teal-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="bg-teal-400 w-full hover:bg-teal-300 space-x-2"
          >
            <span className="font-semibold">Login</span>
            <LoginIcon className={"stroke-white w-5 h-5 stroke-2"} />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
