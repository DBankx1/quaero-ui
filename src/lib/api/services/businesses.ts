import type { Business } from "~/types/Business";
import { apiClient } from "../client";

export const businessesAPI = {
  /**
   * Search business by query
   */
  search: async (s: string): Promise<Business[]> => {
    return apiClient.get<Business[]>(
      `/businesses/search?s=${encodeURIComponent(s)}`,
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
    return apiClient.get<number>("/businesses/count");
  },
};
