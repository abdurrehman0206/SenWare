import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddItemForm from "./AddItemForm";
const AddItemDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full sm:w-auto text-white bg-teal-300 hover:bg-teal-400 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        Add Items
      </DialogTrigger>
      <DialogContent className="sm:min-w-[800px] rounded-xl">
        <DialogTitle className="m-auto">Add an Item</DialogTitle>
        <AddItemForm />
      </DialogContent>
    </Dialog>
  );
};
export default AddItemDialog;
