"use client";

import { useMemo } from "react";
import {
  type BusinessSearchResponse,
  type SortOption,
  type Filters,
  type UISearchAction,
  ACTIONS,
} from "~/types/business";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import BusinessSearchActions from "./business-search-actions";

interface BusinessResultsHeaderProps {
  searchQuery: string;
  businessSearchResponse: BusinessSearchResponse;
  sortBy: SortOption;
  filters: Filters;
  onSortChange: (value: SortOption) => void;
  onFilterChange: (filters: Filters) => void;
}

function buildActions(
  sortBy: SortOption,
  filters: Filters,
  onSortChange: (value: SortOption) => void,
  onFilterChange: (filters: Filters) => void,
): UISearchAction[] {
  return ACTIONS.map((action) => {
    if (action.type === "sort") {
      return {
        label: action.label,
        active: sortBy === action.value,
        onClick: () => onSortChange(action.value),
      };
    }

    const isActive = filters[action.key] === true;

    return {
      label: action.label,
      active: isActive,
      onClick: () =>
        onFilterChange({
          ...filters,
          [action.key]: !isActive,
        }),
    };
  });
}

export default function BusinessResultsHeader({
  searchQuery,
  businessSearchResponse,
  sortBy,
  filters,
  onSortChange,
  onFilterChange,
}: Readonly<BusinessResultsHeaderProps>) {
  const actions = useMemo(
    () => buildActions(sortBy, filters, onSortChange, onFilterChange),
    [sortBy, filters, onSortChange, onFilterChange],
  );

  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground truncate text-xl font-bold sm:text-2xl">
              {searchQuery || "Businesses"}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              ({businessSearchResponse.total_count} Result
              {businessSearchResponse.total_count === 1 ? "" : "s"})
            </p>
          </div>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="closest">Closest</SelectItem>
              <SelectItem value="reviewed">Most Reviewed</SelectItem>
              <SelectItem value="name">Name (A–Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <BusinessSearchActions actions={actions} />
      </div>
    </div>
  );
}
