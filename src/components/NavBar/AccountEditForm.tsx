"use client";
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
import { RegisterSchema } from "@/schema";
import { toast } from "sonner";
import { updatePassword } from "@/actions/Auth/updatePassword";

type AccountEditFormData = z.infer<typeof RegisterSchema>;

const AccountEditForm = ({ username }: { username: string }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<AccountEditFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: username,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: AccountEditFormData) => {
    console.log(data);
    setError("");
    setSuccess("");
    startTransition(() => {
      updatePassword(data)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            setSuccess(data.success);
          } else {
            toast.error(data.error);
            setError(data.error);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    });
  };

  return (
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
                    readOnly
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
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
          <span className="font-semibold">Update</span>
        </Button>
      </form>
    </Form>
  );
};

export default AccountEditForm;
