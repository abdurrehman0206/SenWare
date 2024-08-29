"use server";
import { del } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { deleteItemById } from "@/data/item";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const deleteItem = async (id: number) => {
  try {
    const item = await deleteItemById(id);
    if (item.image) {
      if (process.env.MODE === "LOCAL") {
        const fullImagePath = path.join(process.cwd(), "public", item.image);
        const fullBarcodeImagePath = path.join(
          process.cwd(),
          "public",
          item.barcodeImage,
        );
        if (fs.existsSync(fullImagePath)) {
          fs.unlinkSync(fullImagePath);
        }
        if (fs.existsSync(fullBarcodeImagePath)) {
          fs.unlinkSync(fullBarcodeImagePath);
        }
      } else if (process.env.MODE === "VERCEL") {
        await del(item.image);
        await del(item.barcodeImage);
      }
    }
    return { success: "Item deleted successfully" };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
