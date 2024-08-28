"use server";

import { IssuanceSchema } from "@/schema";
import * as z from "zod";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
import { db } from "@/lib/db";
import { checkQuantity, updateItemIssueCountById } from "@/data/item";
import { recipientExists } from "@/data/recipient";
type IssuanceFormData = z.infer<typeof IssuanceSchema>;

export const issueItem = async (data: IssuanceFormData) => {
  const validatedFields = IssuanceSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { itemId, recipientId, quantity } = validatedFields.data;
  if (!(await recipientExists(recipientId))) {
    return { error: "Recipient does not exists" };
  }

  try {
    const isEnough = await checkQuantity(itemId as number, quantity);
    if (!isEnough) {
      return { error: "Not enough quantity available" };
    }
    await db.issuance.create({
      data: {
        itemId: itemId as number,
        recipientId,
        quantity,
      },
    });
    await updateItemIssueCountById(itemId as number, quantity, "add");
    return { success: "Item issued successfully" };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
