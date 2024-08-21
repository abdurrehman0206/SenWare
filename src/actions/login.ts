"use server";
import * as z from "zod";
import { LoginSchema } from "../../schema";
import { log } from "console";
type LoginFormData = z.infer<typeof LoginSchema>;
export const login = async (values: LoginFormData) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  return { success: "Authentication successful" };
};
