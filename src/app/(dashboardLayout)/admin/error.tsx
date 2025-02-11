"use client";
const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <span className="text-red-600 text-lg font-medium">
        Error loading data, please try again later.
      </span>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
