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
import { ItemSchema } from "@/schema";
import { useRef, useState, useTransition } from "react";
import CategorySelector from "./CategorySelector";
import { addItem } from "@/actions/Item/addItem";
import { useItemsContext } from "@/hooks/useItemsContext";
import Barcode from "react-barcode";
import { ReactBarcode } from "react-jsbarcode";
type ItemsFormData = z.infer<typeof ItemSchema>;
import { toast } from "sonner";
import { DownloadIcon } from "../Icons/Download";
const AddItemForm = () => {
  const [barcodeValue, setBarcodeValue] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { refreshItems } = useItemsContext();
  const form = useForm<ItemsFormData>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      brand: "",
      barcode: "",
      vendor: "",
      price: 0,
      image: undefined,
      barcodeImage: undefined,
      quantity: 0,
      categoryName: "",
    },
  });

  const onSubmit = (data: ItemsFormData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as string | Blob);
    }
    if (barRef.current) {
      const svgElement = barRef.current.querySelector("svg");
      if (svgElement) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgElement);
        const blob = new Blob([source], { type: "image/svg+xml" });
        formData.append("barcodeSVG", blob, `${barcodeValue}.svg`);
      }
    }
    setError("");
    setSuccess("");
    startTransition(() => {
      addItem(formData)
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
  const barRef = useRef<any | null>(null);


  const handleDownload = () => {
    if (barRef.current) {
      const svgElement = barRef.current.querySelector("svg");
      if (svgElement) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgElement);
        const blob = new Blob([source], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${barcodeValue}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }
  };
  return (
    <Form {...form}>
      <div className="overflow-scroll" ref={barRef}>
        {barcodeValue.length !== 0 && (
          <ReactBarcode value={barcodeValue} options={{ format: "code128" }} />
        )}
      </div>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 sm:space-y-6"
      >
        <div className="space-x-0 space-y-2 sm:space-y-0 sm:space-x-2 grid grid-cols-1 sm:grid-cols-2">
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
        <div className="space-x-0 space-y-2 sm:space-y-0 sm:space-x-2 grid grid-cols-1 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <div className="flex w-full gap-2">
                  <FormControl>
                    <Input
                      id="barcode"
                      {...field}
                      type="text"
                      placeholder="Barcode"
                      className="focus-visible:ring-teal-400 w-full"
                      disabled={isPending}
                      onChange={(e) => {
                        field.onChange(e);
                        setBarcodeValue(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormLabel>
                    <Button
                      type="button"
                      onClick={handleDownload}
                      className="bg-transparent p-0 rounded-full border-0 hover:bg-transparent ring-0 shadow-none"
                    >
                      <DownloadIcon
                        className={"w-7 h-7 stroke-black hover:stroke-teal-400"}
                      />
                    </Button>
                  </FormLabel>
                </div>
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
        <div className="space-x-0 space-y-2 sm:space-y-0 sm:space-x-2 grid grid-cols-1 sm:grid-cols-2">
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
        <div className="space-x-0 space-y-2 sm:space-y-0 sm:space-x-2 grid grid-cols-1 sm:grid-cols-2">
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
