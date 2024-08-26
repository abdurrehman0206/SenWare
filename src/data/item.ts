import { db } from "@/lib/db";

export const getAllItems = async () => {
  try {
    const items = await db.item.findMany();
    return items;
  } catch {
    return null;
  }
};

export const deleteItemById = async (itemId: number) => {
  try {
    await db.item.delete({ where: { id: itemId } });
  } catch {
    return null;
  }
};
