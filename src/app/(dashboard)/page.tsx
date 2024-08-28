import CumalativeStatBar from "@/components/Dashboard/CumalativeStatBar";
import { IssuancesContextProvider } from "@/context/IssuancesContext";
import { ItemsContextProvider } from "@/context/ItemsContext";
import { RecipientsContextProvider } from "@/context/RecipientContext";

const Home = () => {
  return (
    <ItemsContextProvider>
      <RecipientsContextProvider>
        <IssuancesContextProvider>
          <div>
            <CumalativeStatBar />
          </div>
        </IssuancesContextProvider>
      </RecipientsContextProvider>
    </ItemsContextProvider>
  );
};
export default Home;
