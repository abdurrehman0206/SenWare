import Image from "next/image";
import { LogoIcon } from "../Icons/Logo";
import UserBar from "../UserBar/UserBar";

const TopBar = () => {
  return (
    <nav>
      <div className="p-4 flex items-center justify-between ">
        <div className="flex flex-row relative items-center ">
          <Image
            src={"/Logo.png"}
            alt="SenWare"
            width={40}
            height={40}
            className="h-max"
          />
          <Image
            src={"/LogoText.png"}
            alt="SenWare"
            width={180}
            height={30}
            className="h-max"
          />
        </div>
        <UserBar />
      </div>
    </nav>
  );
};
export default TopBar;
