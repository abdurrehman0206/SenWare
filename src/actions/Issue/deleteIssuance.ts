"use server";
import {
  deleteIssuanceById,
  getIssuanceById,
  markIssuanceReturned,
} from "@/data/issue";
import { updateItemIssueCountById } from "@/data/item";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const deleteIssuance = async (issuanceId: number) => {
  try {
    const issued = await getIssuanceById(issuanceId);
    if (issued) {
      await updateItemIssueCountById(issued.itemId, issued.quantity, "remove");
      await deleteIssuanceById(issuanceId);
      return { success: "Issuance record deleted successfully" };
    } else {
      return { error: "No issue record found" };
    }
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
    return { error: JSON.stringify(error) };
  }
};
