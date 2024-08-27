import Links from "./Links";
import Logout from "./Logout";

const NavBar = () => {
  return (
    <nav className="px-4 flex flex-col w-[280px]">
      <div className=" ">
        <Links />
      </div>
      <Logout />
    </nav>
  );
};
export default NavBar;
