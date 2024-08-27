"use server";
import * as z from "zod";
import { BranchSchema } from "@/schema";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
import { db } from "@/lib/db";
type BranchFormData = z.infer<typeof BranchSchema>;
export const addBranch = async (data: BranchFormData) => {
  const validatedFields = BranchSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name } = validatedFields.data;

  try {
    await db.branch.create({
      data: {
        name,
      },
    });
    return { success: "Branch added successfully" };
  } catch (error: any) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
