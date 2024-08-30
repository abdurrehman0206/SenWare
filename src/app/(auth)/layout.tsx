import Image from "next/image";
import { TabsBar } from "./TabBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-teal-200 flex flex-col justify-center items-center  ">
      <div className=" w-auto sm:w-[400px] space-y-2 ">
        <Image
          src={"/WhiteLogo.png"}
          alt={"Logo"}
          width={120}
          height={120}
          className="-mt-10 mb-20 mx-auto"
        />
        <TabsBar />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
