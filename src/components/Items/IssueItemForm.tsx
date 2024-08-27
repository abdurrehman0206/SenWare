"use client";
import { issueItem } from "@/actions/Issue/issueItem";
import { FormError } from "@/components/FormInfo/FormError";
import { FormSuccess } from "@/components/FormInfo/FormSuccess";
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
import { useItemsContext } from "@/hooks/useItemsContext";
import { IssuanceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type IssuanceFormData = z.infer<typeof IssuanceSchema>;
const IssueItemForm = ({ itemId }: { itemId: number }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { refreshItems } = useItemsContext();
  const form = useForm<IssuanceFormData>({
    resolver: zodResolver(IssuanceSchema),
    defaultValues: {
      itemId: itemId,
      recipientId: undefined,
      quantity: 0,
    },
  });

  const onSubmit = (data: IssuanceFormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      issueItem(data)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            toast.success(data.success);
            refreshItems();
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
            name="recipientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient ID</FormLabel>
                <FormControl>
                  <Input
                    id="recipientId"
                    {...field}
                    type="text"
                    placeholder="Recipient ID"
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
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    id="brand"
                    {...field}
                    type="number"
                    placeholder="Item Quantity"
                    className="focus-visible:ring-teal-400"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          type="submit"
          className="bg-teal-300 hover:bg-teal-400 w-full"
          disabled={isPending}
        >
          Issue Item
        </Button>
      </form>
    </Form>
  );
};

export default IssueItemForm;
