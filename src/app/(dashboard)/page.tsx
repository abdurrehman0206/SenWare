import CumalativeStatBar from "@/components/Dashboard/CumalativeStatBar";
import LatestIssuances from "@/components/Dashboard/LatestIssuances";
import { IssuancesContextProvider } from "@/context/IssuancesContext";
import { ItemsContextProvider } from "@/context/ItemsContext";
import { RecipientsContextProvider } from "@/context/RecipientContext";

const Home = () => {
  return (
    <ItemsContextProvider>
      <RecipientsContextProvider>
        <IssuancesContextProvider>
          <div className="space-y-2">
            <CumalativeStatBar />
            <LatestIssuances />
          </div>
        </IssuancesContextProvider>
      </RecipientsContextProvider>
    </ItemsContextProvider>
  );
};
export default Home;
