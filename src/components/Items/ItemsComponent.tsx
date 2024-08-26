import { ItemsContextProvider } from "@/context/ItemsContext";
import ItemsList from "./ItemsList";

const ItemsComponent = () => {
  return (
    <ItemsContextProvider>
      <ItemsList />
    </ItemsContextProvider>
  );
};

export default ItemsComponent;
