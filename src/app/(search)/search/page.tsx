import SearchResults from "~/components/search/search-results";

interface Props {
  searchParams: {
    s: string;
    category?: string;
  };
}

async function SearchPage({ searchParams }: Props) {
  const query = await searchParams;

  return <SearchResults query={query.s} />;
}

export default SearchPage;
