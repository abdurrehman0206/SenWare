import Image from "next/image";
import { TabsBar } from "./TabBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-teal-200 flex flex-col justify-center items-center gap-2">
      <Image
        src={"/WhiteLogo.png"}
        alt={"Logo"}
        width={120}
        height={120}
        className="-mt-10 mb-20"
      />
      <TabsBar />
      {children}
    </div>
  );
};

export default AuthLayout;
