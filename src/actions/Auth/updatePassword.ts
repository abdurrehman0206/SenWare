"use server";
import bcrypt from "bcryptjs";
import { getUserByUsername } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema";

import * as z from "zod";

type UpdatePassFormData = z.infer<typeof RegisterSchema>;

export const updatePassword = async (data: UpdatePassFormData) => {
  const validatedFields = RegisterSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { username, password } = validatedFields.data;
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return { error: "User does not exists" };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { username: existingUser.username, id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });
    return { success: "Password Updated Successfully" };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
