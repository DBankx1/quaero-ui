"use client";

import { SearchAlert } from "lucide-react";

function SearchError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6">
      <SearchAlert className="h-20 w-20 text-red-800" />
      <h2 className="text-lg font-semibold text-red-800">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-red-700">
        We couldn’t load your search results. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Retry search
      </button>
    </div>
  );
}

export default SearchError;
