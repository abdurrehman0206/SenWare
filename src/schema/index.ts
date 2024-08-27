import * as z from "zod";
import { zfd } from "zod-form-data";
export const LoginSchema = z.object({
  username: z.string().min(5, { message: "Username is Required" }),
  password: z.string().min(5, { message: "Password is Required" }),
});

export const RegisterSchema = z.object({
  username: z.string().min(5, { message: "Username is Required" }),
  password: z.string().min(5, { message: "Password is Required" }),
});

export const ItemSchema = z.object({
  name: z.string().min(1, { message: "Item name is required" }),
  brand: z.string().min(1, { message: "Item brand is required" }),
  barcode: z
    .string()
    .min(1, { message: "Barcode is required" })
    .regex(/^[\w-]+$/, { message: "Barcode must be alphanumeric" }),
  vendor: z.string().min(1, { message: "Item vendor is required" }),
  price: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Price cannot be negative" }),
  image: zfd
    .file()
    .refine((file) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg or png.",
      },
    ),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Quantity cannot be negative" }),
  categoryName: z.string().min(1, { message: "Category is required" }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
});

export const BranchSchema = z.object({
  name: z.string().min(1, { message: "Branch name is required" }),
});

export const RecipientSchema = z.object({
  id: z.coerce.number().int().nonnegative({ message: "Id cannot be negative" }),
  name: z.string().min(1, { message: "Recipient name is required" }),
  branchName: z.string().min(1, { message: "Branch is required" }),
});

export const IssuanceSchema = z.object({
  itemId: z.coerce
    .number()
    .int()
    .nonnegative({ message: "ItemId cannot be negative" }),
  recipientId: z.coerce
    .number()
    .int()
    .nonnegative({ message: "RecipientId cannot be negative" }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Quantity must be positive" }),
  issuedAt: z.date(),
});
