import { apiClient } from "../client";
import type { Category } from "~/types/category";

export const categoriesAPI = {
  /**
   * Get all Categories
   */
  getAll: async (): Promise<Category[]> => {
    return apiClient.get<Category[]>("/categories", { cache: "force-cache" });
  },

  /**
   * Get Categories by level
   */
  getByLevel: async (
    level: "primary" | "secondary" | "tertiary",
  ): Promise<Category[]> => {
    return apiClient.get<Category[]>(`/categories?level=${level}`, {
      cache: "force-cache",
    });
  },

  /**
   * Search Categories by keywords
   */
  searchByKeywords: async (keywords: string[]): Promise<Category[]> => {
    return apiClient.get<Category[]>(`/categories/keywords?q=${keywords}`, {
      cache: "force-cache",
    });
  },
};
