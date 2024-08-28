"use server";

import { deleteRecipientById } from "@/data/recipient";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const deleteRecipient = async (id: number) => {
  try {
    const recipient = await deleteRecipientById(id);

    return { success: "Recipient deleted successfully" };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
