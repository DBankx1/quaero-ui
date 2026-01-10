"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import BusinessSearchActionBadge from "./business-search-action-badge";
import type { UISearchAction } from "~/types/business";

interface Props {
  actions: UISearchAction[];
}

export default function BusinessSearchActions({ actions }: Readonly<Props>) {
  if (!actions.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
      </Button>

      {actions.map((action) => (
        <BusinessSearchActionBadge
          key={action.label} // stable key
          label={action.label}
          active={action.active}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
}
