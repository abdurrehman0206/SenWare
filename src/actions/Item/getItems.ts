"use server";

import { getAllItems } from "@/data/item";
import { db } from "@/lib/db";

export const getItems = async () => {
  try {
    const items = await getAllItems();
    return { items };
  } catch (error) {
    return { error: "Failed to fetch items" };
  }
};
