"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" flex flex-col justify-center items-center  p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>

        <div className="w-full border border-red-500 bg-red-50 text-red-700 text-center font-medium p-4 rounded-md mb-6">
          ❌ {error.message || "Unknown error"}
        </div>

        <button
          onClick={() => reset()}
          className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}
