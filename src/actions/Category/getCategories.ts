"use server";
import { getAllCategories } from "@/data/category";
import { db } from "@/lib/db";

export const getCategories = async () => {
  try {
    const categories = await getAllCategories();
    return categories;
  } catch (error) {
    return { error: error };
  }
};
