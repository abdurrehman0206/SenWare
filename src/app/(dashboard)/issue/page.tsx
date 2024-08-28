import IssuanceList from "@/components/Issued/IssuanceList";
import IssuanceStatBar from "@/components/Issued/IssuanceStatBar";
import { IssuancesContextProvider } from "@/context/IssuancesContext";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";

const Issue = () => {
  return (
    <IssuancesContextProvider>
      <div className="flex flex-col gap-2">
        <IssuanceStatBar />
        <IssuanceList />
      </div>
    </IssuancesContextProvider>
  );
};
export default Issue;
