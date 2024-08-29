"use server";
import { getAllNormalUsers } from "@/data/user";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const getUsers = async () => {
  try {
    const users = await getAllNormalUsers();
    if (!users) {
      return { error: "Error getting users" };
    }
    return { users };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
