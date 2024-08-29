import clsx from "clsx";

const Bounded = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx("bg-white rounded-xl shadow-sm p-2 sm:p-5  ", className)}
    >
      {children}
    </div>
  );
};

export default Bounded;
