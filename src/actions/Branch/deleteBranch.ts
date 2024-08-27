"use server";

import { deleteBranchByName } from "@/data/branch";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const deleteBranch = async (branchName: string) => {
  try {
    await deleteBranchByName(branchName);
    return { success: "Branch Deleted Successfully" };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
