import Links from "./Links";
import Logout from "./Logout";

const NavBar = () => {
  return (
    <nav className="px-2 sm:px-4 flex flex-col sm:w-[280px] w-auto">
      <div className=" ">
        <Links />
      </div>
      <Logout />
    </nav>
  );
};
export default NavBar;
