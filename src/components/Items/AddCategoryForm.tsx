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
import { useTransition, useState } from "react";
import { CategorySchema } from "@/schema";
import { addCategory } from "@/actions/Category/addCategory";

type CategoryFormData = z.infer<typeof CategorySchema>;

const AddCategoryForm: React.FC<{ flipTag: () => void }> = ({ flipTag }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCategorySubmit = (data: CategoryFormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addCategory(data).then((data) => {
        if (data.success) {
          setSuccess(data.success);
          flipTag();
        } else {
          setError(data.error);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(handleCategorySubmit)(e);
          e.stopPropagation();
        }}
        className="space-y-6"
      >
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
                  placeholder="Category Name"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description{" "}
                <small className="text-sm text-gray-300">(Optional)</small>
              </FormLabel>
              <FormControl>
                <Input
                  id="description"
                  {...field}
                  type="text"
                  placeholder="Category Description"
                  className="focus-visible:ring-teal-400"
                  disabled={isPending}
                />
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
          Add Category
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
