import IssuanceList from "@/components/Issued/IssuanceList";
import { IssuancesContextProvider } from "@/context/IssuancesContext";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";

const Issue = () => {
  return (
    <IssuancesContextProvider>
      <div>
        <IssuanceList />
      </div>
    </IssuancesContextProvider>
  );
};
export default Issue;
