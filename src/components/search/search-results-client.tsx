"use client";

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import BusinessList from "~/components/ui/business/business-list";
import BusinessResultsHeader from "~/components/ui/business/business-results-header";
import BusinessSearchMap from "~/components/ui/business/business-search-map";
import { Button } from "~/components/ui/button";
import type {
  BusinessSearchResponse,
  Business,
  Filters,
  SortOption,
} from "~/types/business";
import { useCategoryMap } from "~/hooks/use-categories";

const SORTERS: Record<SortOption, (a: Business, b: Business) => number> = {
  relevance: () => 0,
  name: (a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  reviewed: (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
  closest: (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity),
};

const FILTER_PREDICATES: Record<keyof Filters, (biz: Business) => boolean> = {
  is_online_shop: (b) => b.is_online_shop === true,
  is_24_hrs: (b) => b.is_24_hrs === true,
  is_open_now: (b) => b.is_open_now === true,
};

interface Props {
  businesses: BusinessSearchResponse;
  searchQuery: string;
}

export default function SearchResultsClient({
  businesses,
  searchQuery,
}: Readonly<Props>) {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [filters, setFilters] = useState<Filters>({});

  // map the category slugs to their names
  const categoryMap = useCategoryMap();
  businesses.results = businesses.results.map((biz) => ({
    ...biz,
    category_slugs: biz.category_slugs.map((c) => categoryMap.get(c) ?? c),
  }));

  const derivedResults = useMemo(() => {
    const activeFilters = Object.entries(filters).filter(
      ([, enabled]) => enabled === true,
    ) as [keyof Filters, true][];

    return [...businesses.results]
      .filter((biz) =>
        activeFilters.every(([key]) => FILTER_PREDICATES[key](biz)),
      )
      .sort(SORTERS[sortBy]);
  }, [businesses.results, sortBy, filters]);

  const derivedResponse: BusinessSearchResponse = {
    ...businesses,
    results: derivedResults,
  };

  return (
    <>
      <BusinessResultsHeader
        searchQuery={searchQuery}
        businessSearchResponse={derivedResponse}
        sortBy={sortBy}
        filters={filters}
        onSortChange={setSortBy}
        onFilterChange={setFilters}
      />

      <div className="container mx-auto">
        <div className="flex min-h-[calc(100vh-200px)] flex-col lg:flex-row">
          <BusinessList businesses={derivedResponse} />
          <BusinessSearchMap />
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 lg:hidden">
        <Button size="lg" className="shadow-lg">
          <MapPin className="mr-2 h-4 w-4" />
          View Map
        </Button>
      </div>
    </>
  );
}
