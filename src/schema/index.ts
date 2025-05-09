import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(5, { message: "Username is Required" }),
  password: z.string().min(5, { message: "Password is Required" }),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(5, { message: "Username is Required" }),
    password: z.string().min(5, { message: "Password is Required" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Confirm Password is Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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
    .positive({ message: "Price must be positive" }),

  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Quantity must be positive" }),
  issued: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Issued cannot be negative" })
    .optional(),
  categoryName: z.string().min(1, { message: "Category is required" }),
  purchasedAt: z.date().optional(),
  image: z
    .any()
    .refine((file) => file, { message: "Image is required." })
    .refine((file) => file?.size < 4000000, {
      message: "File can't be bigger than 4MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
      {
        message: "File format must be either jpg, jpeg or png.",
      },
    ),
  barcodeImage: z
    .any()
    .refine((file) => file, {
      message: "Barcode Image is required.",
    })
    .refine((file) => file?.size < 4000000, {
      message: "File can't be bigger than 4MB.",
    })
    .refine((file) => ["image/svg+xml"].includes(file?.type), {
      message: "File format must be an SVG",
    })
    .optional(),
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
    .positive({ message: "ItemId cannot be negative" })
    .optional(),
  recipientId: z.coerce
    .number()
    .int()
    .positive({ message: "RecipientId cannot be negative" }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Quantity must be positive" }),
  issuedAt: z.date().optional(),
});
