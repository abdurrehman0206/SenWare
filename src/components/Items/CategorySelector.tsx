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

type CategoriesType = z.infer<typeof CategorySchema>;

const CategorySelector = forwardRef(({ value, onChange, ...props }, ref) => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        if (categoriesData) {
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger ref={ref} className="focus:ring-teal-400">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.name} value={category.name.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

CategorySelector.displayName = "CategorySelector";

export default CategorySelector;
