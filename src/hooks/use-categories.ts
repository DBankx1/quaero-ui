// hooks/use-Categories.ts
import { useQuery } from "@tanstack/react-query";
import { categoriesAPI } from "~/lib/api/services/categories";

export function useCategories() {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoriesAPI.getAll(),
  });
}

export function useCategoriesByLevel(
  level: "primary" | "secondary" | "tertiary",
) {
  return useQuery({
    queryKey: ["Categories", "level", level],
    queryFn: () => categoriesAPI.getByLevel(level),
  });
}

export function useSearchCategoriesByKeywords(keywords: string[]) {
  return useQuery({
    queryKey: ["Categories", "search", keywords],
    queryFn: () => categoriesAPI.searchByKeywords(keywords),
    enabled: keywords.length > 0,
  });
}
