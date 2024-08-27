"use server";

import { deleteRecipientById } from "@/data/recipient";

export const deleteRecipient = async (id: number) => {
  try {
    const recipient = await deleteRecipientById(id);

    return { success: "Recipient deleted successfully" };
  } catch (error) {
    return { error: error ? error : "Failed to delete recipient" };
  }
};
