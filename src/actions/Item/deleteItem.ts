"use server";
import fs from "fs";
import path from "path";
import { deleteItemById } from "@/data/item";

export const deleteItem = async (id: number) => {
  try {
    const item = await deleteItemById(id);
    if (item.image) {
      const fullImagePath = path.join(process.cwd(), "public", item.image);
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
      }
    }
    return { success: "Item deleted successfully" };
  } catch (error) {
    return { error: error ? error : "Failed to delete item" };
  }
};
