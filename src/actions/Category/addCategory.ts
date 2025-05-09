"use server";
import * as z from "zod";
import { CategorySchema } from "@/schema";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
import { db } from "@/lib/db";
type CategoryFormData = z.infer<typeof CategorySchema>;
export const addCategory = async (data: CategoryFormData) => {
  const validatedFields = CategorySchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name } = validatedFields.data;

  try {
    await db.category.create({
      data: {
        name,
      },
    });
    return { success: "Category added successfully" };
  } catch (error: any) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
