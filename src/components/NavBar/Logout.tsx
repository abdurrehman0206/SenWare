import { Button } from "@/components/ui/button";
import { LogoutIcon } from "../Icons/Logout";
import { signOut } from "@/auth";
const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
      className="mt-auto mb-4"
    >
      <Button
        type="submit"
        className="space-x-0 sm:space-x-2 w-full border-teal-200"
        variant={"outline"}
      >
        <p className="text-teal-400 hidden sm:visible">Logout</p>
        <LogoutIcon className={"stroke-2 stroke-teal-400 w-5 h-5"} />
      </Button>
    </form>
  );
};
export default Logout;
