"use server";

import { getAllRecipients } from "@/data/recipient";
import { db } from "@/lib/db";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const getRecipients = async () => {
  try {
    const recipients = await getAllRecipients();
    return { recipients };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
