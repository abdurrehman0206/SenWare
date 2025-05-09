"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

type LoginFormData = z.infer<typeof LoginSchema>;

export const login = async (data: LoginFormData) => {
  const validatedFields = LoginSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { username, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Authentication successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
