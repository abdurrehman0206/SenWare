"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema";
import { getUserByUsername } from "@/data/user";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterFormData) => {
  const validatedData = RegisterSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Registration Field" };
  }
  const { username, password } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByUsername(username);
  const count = await db.user.count();
  if (existingUser) {
    return { error: "Username already taken" };
  }
  try {
    if (count === 0) {
      await db.user.create({
        data: {
          username,
          password: hashedPassword,
          isSuperAdmin: true,
        },
      });
    } else {
      await db.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
    }
    return { success: "Registration Successful" };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
