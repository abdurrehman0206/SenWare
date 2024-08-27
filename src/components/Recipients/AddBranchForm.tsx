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
import { BranchSchema } from "@/schema";
import { addBranch } from "@/actions/Branch/addBranch";

type BranchFormData = z.infer<typeof BranchSchema>;

const AddBranchForm: React.FC<{ flipTag: () => void }> = ({ flipTag }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<BranchFormData>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleBranchSubmit = (data: BranchFormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addBranch(data).then((data) => {
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
          form.handleSubmit(handleBranchSubmit)(e);
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
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Branch Name"
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
          Add Branch
        </Button>
      </form>
    </Form>
  );
};

export default AddBranchForm;
