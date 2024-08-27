import { db } from "@/lib/db";

export const getAllBranches = async () => {
  try {
    const branches = db.branch.findMany();
    return branches;
  } catch (error) {
    console.log("Branch Error", error);
    throw error;
  }
};

export const deleteBranchByName = async (branchName: string) => {
  try {
    await db.branch.delete({
      where: {
        name: branchName,
      },
    });
  } catch (error) {
    console.log("Branch Error", error);
    throw error;
  }
};
