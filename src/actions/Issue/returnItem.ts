"use server";
import { getIssuanceById, markIssuanceReturned } from "@/data/issue";
import { updateItemIssueCountById } from "@/data/item";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const returnItem = async (issuanceId: number) => {
  try {
    const issued = await getIssuanceById(issuanceId);
    if (issued) {
      await markIssuanceReturned(issuanceId);
      await updateItemIssueCountById(issued.itemId, issued.quantity, "remove");
      return { success: "Issuance returnd successfully" };
    } else {
      return { error: "No issue record found" };
    }
  } catch (error: any) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
