"use server";
import * as z from "zod";
import { RecipientSchema } from "@/schema";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
import { db } from "@/lib/db";
type RecipientFormData = z.infer<typeof RecipientSchema>;
export const addRecipient = async (data: RecipientFormData) => {
  const validatedFields = RecipientSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { id, name, branchName } = validatedFields.data;

  try {
    await db.recipient.create({
      data: {
        id,
        name,
        branchName,
      },
    });
    return { success: "Recipient added successfully" };
  } catch (error: any) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
