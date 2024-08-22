import Links from "./Links";
import Logout from "./Logout";

const NavBar = () => {
  return (
    <nav className="px-4 flex flex-col">
      <div className=" w-[240px]">
        <Links />
      </div>
      <Logout />
    </nav>
  );
};
export default NavBar;
