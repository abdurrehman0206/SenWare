"use client";
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
import { ItemSchema } from "@/schema";
import * as z from "zod";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import CategorySelector from "./CategorySelector";
import { addItem } from "@/actions/Item/addItem";
import { FormSuccess } from "@/components/FormInfo/FormSuccess";
import { FormError } from "@/components/FormInfo/FormError";

type ItemsFormData = z.infer<typeof ItemSchema>;

const AddItemForm = ({ onItemAdded }: { onItemAdded: () => void }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<ItemsFormData>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      brand: "",
      barcode: "",
      vendor: "",
      price: 0,
      image: undefined,
      quantity: 0,
      categoryName: "",
    },
  });

  const onSubmit = (data: ItemsFormData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as string | Blob);
    }

    setError("");
    setSuccess("");
    startTransition(() => {
      addItem(formData)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
          if (data.success) {
            onItemAdded();
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    {...field}
                    type="text"
                    placeholder="Item Name"
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
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    id="brand"
                    {...field}
                    type="text"
                    placeholder="Item Brand"
                    className="focus-visible:ring-teal-400"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-x-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <FormControl>
                  <Input
                    id="barcode"
                    {...field}
                    type="text"
                    placeholder="Barcode"
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
            name="vendor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor</FormLabel>
                <FormControl>
                  <Input
                    id="vendor"
                    {...field}
                    type="text"
                    placeholder="Vendor"
                    className="focus-visible:ring-teal-400"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-x-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    id="price"
                    {...field}
                    type="number"
                    placeholder="Item Price"
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
                    id="quantity"
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
        <div className="space-x-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelector {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    {...fieldProps}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Item Quantity"
                    className="focus-visible:ring-teal-400"
                    disabled={isPending}
                    onChange={(e) =>
                      onChange(e.target.files && e.target.files[0])
                    }
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
          Add Item
        </Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
