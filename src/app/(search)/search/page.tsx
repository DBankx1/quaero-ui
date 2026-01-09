import { Suspense } from "react";
import SearchInput from "~/components/search/search-input";
import SearchResults from "~/components/search/search-results";
import SearchResultsSkeleton from "~/components/ui/skeleton/search-results-skeleton";

interface Props {
  searchParams: {
    s: string;
    category?: string;
  };
}

async function SearchPage({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className="min-h-screen">
      {/* TODO: change top-0 to top-[height_of_nav] */}
      <div className="sticky top-0 z-40">
        <SearchInput defaultValue={query.s} />
      </div>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query.s} />
      </Suspense>
    </main>
  );
}

export default SearchPage;
