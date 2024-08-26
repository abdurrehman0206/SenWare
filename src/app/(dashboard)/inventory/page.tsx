import ItemsList from "@/components/Items/ItemsList";
import ItemsStatBar from "@/components/Items/ItemsStatBar";
import { ItemsContextProvider } from "@/context/ItemsContext";

const Inventory = () => {
  return (
    <ItemsContextProvider>
      <div className="flex flex-col gap-2">
        <ItemsStatBar />
        <ItemsList />
      </div>
    </ItemsContextProvider>
  );
};
export default Inventory;
