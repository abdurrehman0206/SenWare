import { Button } from "@/components/ui/button";
import Links from "./Links";
import Logout from "./Logout";
import Settings from "./Settings";

const NavBar = () => {
  return (
    <nav className="px-2 sm:px-4 flex flex-col sm:w-[280px] w-auto">
      <div className=" ">
        <Links />
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <Settings />
        <Logout />
      </div>
    </nav>
  );
};
export default NavBar;
