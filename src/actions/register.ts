import * as z from "zod";
import { RegisterSchema } from "../../schema";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterFormData) => {
  const validatedData = RegisterSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Registration Field" };
  }
  return { success: "Registration Successful" };
};
