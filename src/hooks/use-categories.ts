"use client";
import { useEffect, useMemo, useState } from "react";
import { categoriesAPI } from "~/lib/api/services/categories";

export function useCategoryMap(localStorageKey = "categories") {
  const [categories, setCategories] = useState<
    { slug: string; name: string }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      try {
        setCategories(JSON.parse(stored));
      } catch {
        setCategories([]);
      }
    } else {
      categoriesAPI
        .getAll()
        .then((data: { slug: string; name: string }[]) => {
          setCategories(data);
          localStorage.setItem(localStorageKey, JSON.stringify(data));
        })
        .catch(() => setCategories([]));
    }
  }, [localStorageKey]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((cat) => map.set(cat.slug, cat.name));
    return map;
  }, [categories]);

  return categoryMap;
}
