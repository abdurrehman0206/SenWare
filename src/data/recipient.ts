"use server";
import { db } from "@/lib/db";

export const getAllRecipients = async () => {
  try {
    const recipient = await db.recipient.findMany();
    return recipient;
  } catch (error) {
    console.log("Recipient Error", error);
    throw error;
  }
};

export const recipientExists = async (recipientId: number) => {
  try {
    const recipient = await db.recipient.findUnique({
      where: { id: recipientId },
    });
    if (recipient) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Recipient Error", error);
    throw error;
  }
};

export const deleteRecipientById = async (recipientId: number) => {
  try {
    const recipient = await db.recipient.delete({ where: { id: recipientId } });
    return recipient;
  } catch (error) {
    console.log("Recipient Error", error);
    throw error;
  }
};
