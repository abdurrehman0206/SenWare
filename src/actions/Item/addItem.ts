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
    barcodeImage: formData.get("barcodeSVG"),
  };

  const validatedFields = ItemSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {
    name,
    brand,
    barcode,
    vendor,
    price,
    quantity,
    categoryName,
    image,
    barcodeImage,
  } = validatedFields.data;

  try {
    const imageName = `${name}_${image.name}`;
    const barcodeImageName = `${name}_${barcodeImage.name}`;
    let imageUrl = "",
      barcodeUrl = "";

    if (process.env.MODE === "LOCAL") {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const filePath = `./public/uploads/${imageName}`;
      await fs.mkdir("./public/uploads/", { recursive: true });
      await fs.writeFile(filePath, buffer);
      imageUrl = `/uploads/${imageName}`;
      const barcodeBuffer = await barcodeImage.arrayBuffer();
      const barcodeFilePath = `./public/uploads/${barcodeImageName}`;
      await fs.writeFile(barcodeFilePath, new Uint8Array(barcodeBuffer));
      barcodeUrl = `/uploads/${barcodeImageName}`;
    } else if (process.env.MODE === "VERCEL") {
      const blob = await put(imageName, image, { access: "public" });
      imageUrl = blob.url;
      const barcodeBlob = await put(barcodeImageName, barcodeImage, {
        access: "public",
      });
      barcodeUrl = barcodeBlob.url;
    }

    await db.item.create({
      data: {
        name,
        brand,
        barcode,
        vendor,
        price,
        quantity,
        categoryName,
        image: imageUrl,
        barcodeImage: barcodeUrl,
      },
    });

    return { success: "Item added successfully" };
  } catch (error: any) {
    console.log(error);
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
