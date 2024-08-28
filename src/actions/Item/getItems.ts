"use server";

import { getAllItems } from "@/data/item";
import { db } from "@/lib/db";

export const getItems = async () => {
  try {
    const items = await getAllItems();
    const formatedItems = items.map((item) => {
      return {
        ...item,
        purchasedAt: new Date(item.purchasedAt).toLocaleDateString(),
      };
    });
    return { items: formatedItems };
  } catch (error) {
    return { error: "Failed to fetch items" };
  }
};
