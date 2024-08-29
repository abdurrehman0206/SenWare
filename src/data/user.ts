"use server";

import { db } from "@/lib/db";
export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getAllNormalUsers = async () => {
  try {
    const user = await db.user.findMany({ where: { isSuperAdmin: false } });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { error: "User does not exists" };
    } else if (user.isSuperAdmin) {
      return { error: "Cannot delete this user" };
    }
    await db.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};
