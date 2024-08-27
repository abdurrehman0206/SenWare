import { db } from "@/lib/db";

export const getAllItems = async () => {
  try {
    const items = await db.item.findMany();
    return items;
  } catch (error) {
    console.log("Item Error", error);
    throw error;
  }
};

export const deleteItemById = async (itemId: number) => {
  try {
    const item = await db.item.delete({ where: { id: itemId } });
    return item;
  } catch (error) {
    console.log("Item Error", error);
    throw error;
  }
};

export const updateItemIssueCountById = async (
  itemId: number,
  issueQuantity: number,
) => {
  try {
    const itemToUpdate = await db.item.findUnique({ where: { id: itemId } });
    if (itemToUpdate) {
      const totalIssuedQuantity = itemToUpdate?.issued + issueQuantity;
      await db.item.update({
        where: { id: itemId },
        data: { issued: totalIssuedQuantity },
      });
    } else {
      throw new Error("Failed to issue");
    }
  } catch (error) {
    console.log("Item Error", error);
    throw error;
  }
};
