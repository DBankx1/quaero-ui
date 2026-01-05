// hooks/use-Categories.ts
import { useQuery } from "@tanstack/react-query";
import { businessesAPI } from "~/lib/api/services/businesses";

export function useBusinessesSearch(s: string) {
  return useQuery({
    queryKey: ["Businesses", "search", s],
    queryFn: () => businessesAPI.search(s),
  });
}

export function useBusinessesSearchByCategories(
  keywords: string[],
  limit: number = 20,
) {
  return useQuery({
    queryKey: ["Businesses", "search-categories", keywords],
    queryFn: () => businessesAPI.searchByCategories(keywords, limit),
    enabled: keywords.length > 0,
  });
}

export function useBusinessesIndexedCount() {
  return useQuery({
    queryKey: ["Businesses", "indexed-count"],
    queryFn: () => businessesAPI.getIndexedBusinessCount(),
  });
}
