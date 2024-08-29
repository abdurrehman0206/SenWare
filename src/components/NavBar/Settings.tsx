import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth, signOut } from "@/auth";
import { SettingsIcon } from "@/components/Icons/Settings";
import AccountEditForm from "./AccountEditForm";
import ManageUsers from "./ManageUsers";
import ManageUsersServer from "./ManageUsersServer";

const Settings = async () => {
  const session = await auth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          className="space-x-0 sm:space-x-2 w-full border-teal-200 hover:bg-teal-400/20"
          variant={"outline"}
        >
          <p className="text-teal-400 hidden sm:block">Settings</p>
          <SettingsIcon className={"stroke-2 stroke-teal-400 w-5 h-5"} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <Tabs defaultValue={"account"}>
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm mb-4">
            <TabsTrigger
              value="account"
              className={
                "data-[state=active]:bg-teal-400 data-[state=active]:text-white "
              }
            >
              Update Password
            </TabsTrigger>
            {session?.user.isSuperAdmin && (
              <TabsTrigger
                value="manage"
                className={
                  "data-[state=active]:bg-teal-400 data-[state=active]:text-white "
                }
              >
                Manage Users
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="account">
            <DialogHeader className="mb-2">
              <DialogTitle>Account</DialogTitle>
              <DialogDescription>Update your password here.</DialogDescription>
            </DialogHeader>
            <AccountEditForm username={session?.user.username || ""} />
          </TabsContent>
          <TabsContent value="manage">
            <DialogHeader className="mb-2">
              <DialogTitle>Manage User</DialogTitle>
              <DialogDescription>Manage other users here.</DialogDescription>
            </DialogHeader>
            <ManageUsersServer />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default Settings;
