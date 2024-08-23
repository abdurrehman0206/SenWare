import { LogoIcon } from "../Icons/Logo";
import UserBar from "../UserBar/UserBar";

const TopBar = () => {
  return (
    <nav>
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-bold text-xl flex justify-center items-center">
          Sen
          <span className="text-teal-400">Ware</span>
        </h1>
        <UserBar />
      </div>
    </nav>
  );
};
export default TopBar;
