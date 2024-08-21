"use client";

const Error = () => {
  return (
    <div className="bg-red-200 border border-red-600 text-red-300 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> An error occurred. Please try again later.</span>
    </div>
  );
};
export default Error;
