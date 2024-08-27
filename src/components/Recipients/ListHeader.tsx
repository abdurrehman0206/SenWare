import AddRecipientDialog from "./AddRecipientDialog";
const ListHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <AddRecipientDialog />
      </div>
    </div>
  );
};
export default ListHeader;
