"use server";

import { getAllRecipients } from "@/data/recipient";
import { db } from "@/lib/db";

export const getRecipients = async () => {
  try {
    const recipients = await getAllRecipients();
    return { recipients };
  } catch (error) {
    return { error: "Failed to fetch recipients" };
  }
};
