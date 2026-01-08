"use client";

import type { BusinessSearchResponse } from "~/types/business";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import BusinessSearchActions from "./business-search-actions";

interface BusinessResultsHeaderProps {
  searchQuery: string;
  businessSearchResponse: BusinessSearchResponse;
}

function BusinessResultsHeader({
  searchQuery,
  businessSearchResponse,
}: BusinessResultsHeaderProps) {
  const [sortBy, setSortBy] = useState("relevance");

  const handleSortChange = (value: string) => {
    console.log(`Sort by: ${value}`);
    setSortBy(value);
  };

  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground truncate text-xl font-bold sm:text-2xl">
              {searchQuery || "Businesses"}{" "}
              {/* {categorySlug && (
                  <span className="text-muted-foreground">
                    in {categorySlug}
                  </span>
                )} */}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              ({businessSearchResponse.total_count} Result
              {businessSearchResponse.total_count === 1 ? "" : "s"})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="closest">Closest</SelectItem>
                <SelectItem value="reviewed">Most Reviewed</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <BusinessSearchActions />
      </div>
    </div>
  );
}

export default BusinessResultsHeader;
