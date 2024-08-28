import clsx from "clsx";

const StatCard = ({
  statHeader,
  statIcon,
  statCount,
  className,
}: {
  statHeader: { text: string; className: string };
  statIcon: React.ReactNode;
  statCount: number | string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "ring-1 ring-gray-100 shadow-sm rounded-md w-[200px] p-4 flex flex-col gap-3",
        className,
      )}
    >
      <div
        className={clsx(statHeader.className, "flex flex-row justify-between")}
      >
        {statHeader.text}
        {statIcon}
      </div>
      {statCount}
    </div>
  );
};

export default StatCard;
