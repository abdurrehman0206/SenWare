import TopBar from "@/components/TopBar/TopBar";
import NavBar from "@/components/NavBar/NavBar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-teal-200 p-0 sm:p-2 h-full ">
      <div className="rounded-none sm:rounded-2xl overflow-hidden bg-white h-full flex flex-col shadow-lg">
        <TopBar />
        <div className="box-border flex overflow-scroll h-full">
          <NavBar />

          <div className="w-full h-full bg-gray-100 rounded-tl-2xl overflow-scroll p-1 sm:p-2 box-border border">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
