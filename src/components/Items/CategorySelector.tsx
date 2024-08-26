import React, { useState, useEffect, forwardRef } from "react";
import { getCategories } from "@/actions/Category/getCategories";
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

type CategoriesType = z.infer<typeof CategorySchema>;

const CategorySelector = forwardRef(({ value, onChange, ...props }, ref) => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [tag, setTag] = useState<boolean>(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        if (categoriesData) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [tag]);

  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger ref={ref} className="focus:ring-teal-400">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem key={category.name} value={category.name.toString()}>
              {category.name}
            </SelectItem>
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
});

CategorySelector.displayName = "CategorySelector";

export default CategorySelector;
