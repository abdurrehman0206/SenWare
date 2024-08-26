"use server";
import { db } from "@/lib/db";

export const getCategoryCount = async () => {
  try {
    const count = await db.category.count();
    return { count };
  } catch (error) {
    return { error: "Failed to get category count" };
  }
};
