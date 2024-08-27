"use server";
import { getAllBranches } from "@/data/branch";
import { db } from "@/lib/db";

export const getBranches = async () => {
  try {
    const branches = await getAllBranches();
    return branches;
  } catch (error) {
    return { error: error };
  }
};
