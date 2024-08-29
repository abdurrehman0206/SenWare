import { auth } from "@/auth";
import ManageUsers from "./ManageUsers";

const ManageUsersServer = async () => {
  const session = auth();
  return <ManageUsers session={session} />;
};
