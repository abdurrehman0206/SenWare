"use server";
import { db } from "@/lib/db";

export const getAllIssuances = async () => {
  try {
    const issuances = await db.issuance.findMany({
      include: {
        recipient: {
          select: {
            name: true,
            branchName: true,
          },
        },
        item: {
          select: {
            name: true,
            barcode: true,
            image: true,
            price: true,
          },
        },
      },
    });
    return issuances;
  } catch (error) {
    console.log("Issuance Error", error);
    throw error;
  }
};

export const getIssuanceById = async (issuanceId: number) => {
  const issued = await db.issuance.findUnique({ where: { id: issuanceId } });
  if (issued) {
    return issued;
  } else {
    return null;
  }
  try {
  } catch (error) {
    console.log("Issuance Error", error);
    throw error;
  }
};
export const deleteIssuanceById = async (issuanceId: number) => {
  try {
    await db.issuance.delete({ where: { id: issuanceId } });
  } catch (error) {
    console.log("Issuance Error", error);
    throw error;
  }
};
export const markIssuanceReturned = async (issuanceId: number) => {
  try {
    await db.issuance.update({
      where: { id: issuanceId },
      data: {
        returned: true,
      },
    });
  } catch (error) {
    console.log("Issuance Error", error);
    throw error;
  }
};
