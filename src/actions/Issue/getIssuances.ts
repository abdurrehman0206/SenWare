"use server";

import { getAllIssuances } from "@/data/issue";
import { PrimsaCodeResponse } from "../../../prisma/PrismaCodeResponse";
export const getIssuances = async () => {
  try {
    const issuances = await getAllIssuances();
    const formattedIssuances = issuances.map((issuance) => ({
      id: issuance.id,
      recipientId: issuance.recipientId,
      recipientName: issuance.recipient.name,
      recipientBranchName: issuance.recipient.branchName,
      quantityIssued: issuance.quantity,
      itemName: issuance.item.name,
      itemBarcode: issuance.item.barcode,
      itemImage: issuance.item.image,
      itemPrice: issuance.item.price,
      issuedAt: new Date(issuance.issuedAt).toLocaleString(),
      returned: issuance.returned,
    }));

    return { issuances: formattedIssuances };
  } catch (error) {
    const errHandler = new PrimsaCodeResponse(error);
    return { error: errHandler.getErrorResponse().message };
  }
};
