"use client";
import React, { useState, useEffect, forwardRef, useTransition } from "react";
import { getCategories } from "@/actions/Category/getCategories";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { CategorySchema } from "@/schema";
import * as z from "zod";
import { AddIcon } from "@/components/Icons/Add";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategoryForm from "./AddCategoryForm";
import { useItemsContext } from "@/hooks/useItemsContext";
import { DeleteIcon } from "@/components/Icons/Delete";
import { deleteCategory } from "@/actions/Category/deleteCategory";
import { Button } from "@/components/ui/button";

type CategoriesType = z.infer<typeof CategorySchema>;
interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}
const CategorySelector = forwardRef<HTMLButtonElement, CategorySelectorProps>(
  ({ value, onChange, ...props }, ref) => {
    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [tag, setTag] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getCategories();

          if (response.categories) {
            setCategories(response.categories);
          } else {
            console.error("Error fetching categories:", response.error);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchCategories();
    }, [tag]);

    const handleCategoryDelete = (categoryName: string) => {
      startTransition(() => {
        deleteCategory(categoryName).then((data) => {
          if (data.success) {
            setTag((prev) => !prev);
          } else {
            toast.error(data.error);
          }
        });
      });
    };
    return (
      <Select value={value} onValueChange={onChange} {...props}>
        <SelectTrigger ref={ref} className="focus:ring-teal-400">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex justify-between items-center hover:bg-teal-400/5 "
              >
                <SelectItem
                  key={category.name}
                  value={category.name.toString()}
                  className="focus:bg-transparent"
                >
                  {category.name}
                </SelectItem>
                <Button
                  className="bg-transparent hover:bg-transparent shadow-none p-0 h-max rounded-xl"
                  onClick={() => handleCategoryDelete(category.name)}
                  disabled={isPending}
                >
                  <DeleteIcon className="w-5 h-5 stroke-destructive hover:stroke-transparent hover:fill-destructive/90" />
                </Button>
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <SelectLabel className="cursor-pointer flex items-center gap-2 hover:bg-teal-400/10 rounded-sm">
                  <AddIcon className="w-5 h-5 stroke-black" />
                  Add Category
                </SelectLabel>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add A New Category</DialogTitle>
                </DialogHeader>
                <AddCategoryForm flipTag={() => setTag((prev) => !prev)} />
              </DialogContent>
            </Dialog>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
);

CategorySelector.displayName = "CategorySelector";

export default CategorySelector;
