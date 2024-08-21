import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(5, "Username is Required"),
  password: z.string().min(5, { message: "Password is Required" }),
});

export const RegisterSchema = z.object({
  username: z.string().min(5, "Username is Required"),
  password: z.string().min(5, { message: "Password is Required" }),
});
