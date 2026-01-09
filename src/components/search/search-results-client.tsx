"use client";

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import BusinessList from "~/components/ui/business/business-list";
import BusinessResultsHeader from "../ui/business/business-results-header";
import BusinessSearchMap from "~/components/ui/business/business-search-map";
import { Button } from "~/components/ui/button";
import type { BusinessSearchResponse, Business } from "~/types/business";

type SortOption = "relevance" | "rating" | "closest" | "reviewed" | "name";

interface Props {
  businesses: BusinessSearchResponse;
  searchQuery: string;
}

export default function SearchResultsClient({
  businesses,
  searchQuery,
}: Readonly<Props>) {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Sort businesses based on selected option
  const sortedBusinesses = useMemo(() => {
    const results = [...businesses.results];

    switch (sortBy) {
      case "name":
        return results.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
        );

      case "rating":
        return results.sort((a, b) => b.rating - a.rating);

      case "reviewed":
        // Assuming businesses have a reviewCount property
        return results.sort(
          (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0),
        );

      case "closest":
        // Assuming businesses have a distance property
        return results.sort(
          (a, b) => (a.distance || Infinity) - (b.distance || Infinity),
        );

      case "relevance":
      default:
        // Return original order (already sorted by relevance from API)
        return results;
    }
  }, [businesses.results, sortBy]);

  // Create sorted response object
  const sortedResponse: BusinessSearchResponse = {
    ...businesses,
    results: sortedBusinesses,
  };

  return (
    <>
      <BusinessResultsHeader
        searchQuery={searchQuery}
        businessSearchResponse={sortedResponse}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="container mx-auto">
        <div className="flex min-h-[calc(100vh-200px)] flex-col lg:flex-row">
          <BusinessList businesses={sortedResponse} />
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
