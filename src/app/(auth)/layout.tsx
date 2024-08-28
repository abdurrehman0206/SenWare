import { TabsBar } from "./TabBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-teal-200 flex flex-col justify-center items-center gap-2">
      <TabsBar />
      {children}
    </div>
  );
};

export default AuthLayout;
