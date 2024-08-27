"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/FormInfo/FormSuccess";
import { FormError } from "@/components/FormInfo/FormError";
import { RecipientSchema } from "@/schema";
import { useState, useTransition } from "react";
import BranchSelector from "./BranchSelector";
import { addItem } from "@/actions/Item/addItem";

type RecipientFormData = z.infer<typeof RecipientSchema>;
import { toast } from "sonner";
import { useRecipientsContext } from "@/hooks/useRecipientsContext";
import { addRecipient } from "@/actions/Recipient/addRecipient";
const AddRecipientForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { refreshRecipients } = useRecipientsContext();
  const form = useForm<RecipientFormData>({
    resolver: zodResolver(RecipientSchema),
    defaultValues: {
      name: "",
      branchName: "",
    },
  });

  const onSubmit = (data: RecipientFormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addRecipient(data)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            toast.success(data.success);
            refreshRecipients();
          } else {
            setError(data.error);
            toast.error(data.error);
          }
        })
        .catch((err) => {
          setError(err.error);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-x-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    id="id"
                    {...field}
                    type="number"
                    placeholder="Recipients ID"
                    className="focus-visible:ring-teal-400"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    {...field}
                    type="text"
                    placeholder="Recipients Name"
                    className="focus-visible:ring-teal-400"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <BranchSelector {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          type="submit"
          className="bg-teal-300 hover:bg-teal-400 w-full"
          disabled={isPending}
        >
          Add Recipient
        </Button>
      </form>
    </Form>
  );
};

export default AddRecipientForm;
