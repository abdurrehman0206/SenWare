"use server";
import { deleteUserById } from "@/data/user";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const deleteUser = async (userId: string) => {
  try {
    await deleteUserById(userId);
    return { success: "User deleted successfully" };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
