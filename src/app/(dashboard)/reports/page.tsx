import CategoryIssueChart from "@/components/Reports/CategoryIssue";
import ItemsChart from "@/components/Reports/ItemsChart";
import RevenueTrendChart from "@/components/Reports/RevenueTrend";
import { IssuancesContextProvider } from "@/context/IssuancesContext";
import { ItemsContextProvider } from "@/context/ItemsContext";
import { RecipientsContextProvider } from "@/context/RecipientContext";

const Reports = () => {
  return (
    <ItemsContextProvider>
      <RecipientsContextProvider>
        <IssuancesContextProvider>
          <div className="flex flex-row flex-wrap gap-2">
            <ItemsChart />
            <CategoryIssueChart />
            <RevenueTrendChart />
          </div>
        </IssuancesContextProvider>
      </RecipientsContextProvider>
    </ItemsContextProvider>
  );
};
export default Reports;
