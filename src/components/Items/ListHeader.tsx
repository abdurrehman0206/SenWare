import AddItemDialog from "./AddItemDialog";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "@/components/Icons/Filter";
const ListHeader = ({ onItemAdded }: { onItemAdded: () => void }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <AddItemDialog onItemAdded={onItemAdded} />
      </div>
    </div>
  );
};
export default ListHeader;
