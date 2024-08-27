import RecipientsList from "@/components/Recipients/RecipientsList";
import RecipientsStatBar from "@/components/Recipients/RecipientsStatBar";
import { RecipientsContextProvider } from "@/context/RecipientContext";

const Recipients = () => {
  return (
    <RecipientsContextProvider>
      <div className="flex flex-col gap-2">
        <RecipientsStatBar />
        <RecipientsList />
      </div>
    </RecipientsContextProvider>
  );
};
export default Recipients;
