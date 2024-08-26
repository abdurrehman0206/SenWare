import { db } from "@/lib/db";

export const getAllCategories = async () => {
  try {
    const categories = db.category.findMany();
    return categories;
  } catch (error) {
    console.log("Category Error", error);
    return null;
  }
};
