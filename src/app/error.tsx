"use client";

const Error = () => {
  return (
    <div
      className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Something Went Wrong!</strong>
      <span className="block sm:inline">
        An error occurred. Please try again later.
      </span>
    </div>
  );
};
export default Error;
