"use client";

import { useSearchParams } from "next/navigation";
import SearchInput from "~/components/search/search-input";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("s") || "";
  return (
    <main>
      <SearchInput
        defaultValue={query}
        onSubmit={(values) => console.log(values)}
      />
    </main>
  );
}

export default SearchPage;
