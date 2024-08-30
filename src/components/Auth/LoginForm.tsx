"use client";
import { login } from "@/actions/Auth/login";
import { FormError } from "@/components/FormInfo/FormError";
import { FormSuccess } from "@/components/FormInfo/FormSuccess";
import { LoginIcon } from "@/components/Icons/Login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schema";
import { CardWrapper } from "./CardWrapper";

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(data)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch((err) => {
          setError(err.error);
        });
    });
  };

  return (
    <CardWrapper headerLabel="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                      disabled={isPending}
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="bg-teal-400 w-full hover:bg-teal-300 space-x-2"
            disabled={isPending}
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
