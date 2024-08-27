import { db } from "@/lib/db";

export const getAllCategories = async () => {
  try {
    const categories = db.category.findMany();
    return categories;
  } catch (error) {
    console.log("Category Error", error);
    throw error;
  }
};

export const deleteCategoryByName = async (categoryName: string) => {
  try {
    await db.category.delete({
      where: {
        name: categoryName,
      },
    });
  } catch (error) {
    console.log("Category Error", error);
    throw error;
  }
};
