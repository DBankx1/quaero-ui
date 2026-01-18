import type { Business, BusinessSearchResponse } from "~/types/business";
import { apiClient } from "../client";

export const businessesAPI = {
  /**
   * Search business by query
   */
  search: async (s: string): Promise<BusinessSearchResponse> => {
    return apiClient.get<BusinessSearchResponse>(
      `/businesses/search?s=${encodeURIComponent(s)}`,
      {
        cache: "no-store",
      },
    );
  },

  /**
   * Search by Categories
   */
  searchByCategories: async (
    categories: string[],
    limit: number = 20,
  ): Promise<Business[]> => {
    // Build query params with multiple category parameters
    const params = new URLSearchParams();

    categories.forEach((category) => {
      params.append("category", category);
    });

    params.append("limit", limit.toString());

    return apiClient.get<Business[]>(
      `/businesses/categories?${params.toString()}`,
    );
  },

  /**
   * Get indexed business count
   */
  getIndexedBusinessCount: async (): Promise<number> => {
    return apiClient.get<number>("/businesses/count", { cache: "force-cache" });
  },
};
