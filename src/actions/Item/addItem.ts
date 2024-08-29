"use server";
import { put, getDownloadUrl } from "@vercel/blob";
import { db } from "@/lib/db";
import { ItemSchema } from "@/schema";
import { Prisma } from "@prisma/client";
import * as z from "zod";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
import fs from "node:fs/promises";
import path from "node:path";
type ItemFormData = z.infer<typeof ItemSchema>;

export const addItem = async (formData: FormData) => {
  const data = {
    name: formData.get("name"),
    brand: formData.get("brand"),
    barcode: formData.get("barcode"),
    vendor: formData.get("vendor"),
    price: formData.has("price")
      ? parseInt(formData.get("price") as string, 10)
      : undefined,
    quantity: formData.has("quantity")
      ? parseInt(formData.get("quantity") as string, 10)
      : undefined,
    categoryName: formData.get("categoryName"),
    image: formData.get("image"),
  };
  const validatedFields = ItemSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, brand, barcode, vendor, price, quantity, categoryName, image } =
    validatedFields.data;

  try {
    const fileName = `${name}_${image.name}`;
    if (process.env.MODE === "LOCAL") {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const filePath = `./public/uploads/${fileName}`;
      await fs.mkdir("./public/uploads/", { recursive: true });
      await fs.writeFile(filePath, buffer);
      await db.item.create({
        data: {
          name,
          brand,
          barcode,
          vendor,
          price,
          quantity,
          categoryName,
          image: `/uploads/${fileName}`,
        },
      });
    } else if (process.env.MODE === "VERCEL") {
      const blob = await put(fileName, image, {
        access: "public",
      });
      await db.item.create({
        data: {
          name,
          brand,
          barcode,
          vendor,
          price,
          quantity,
          categoryName,
          image: blob.downloadUrl,
        },
      });
    }
    return { success: "Item added successfully" };
  } catch (error: any) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
