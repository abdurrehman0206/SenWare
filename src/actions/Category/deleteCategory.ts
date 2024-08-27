"use server";
import { deleteCategoryByName } from "@/data/category";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const deleteCategory = async (categoryName: string) => {
  try {
    await deleteCategoryByName(categoryName);
    return { success: "Category Deleted Successfully" };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
