import { businessesAPI } from "~/lib/api/services/businesses";
import SearchResultsClient from "./search-results-client";

interface Props {
  query: string;
}

export default async function SearchResults({ query }: Readonly<Props>) {
  const businesses = await businessesAPI.search(query);
  return <SearchResultsClient businesses={businesses} searchQuery={query} />;
}
