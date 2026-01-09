"use client";

import { SlidersHorizontal } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import BusinessSearchActionBadge from "./business-search-action-badge";
import type { BusinessSearchAction } from "~/types/business";

interface Props {
  actions: BusinessSearchAction[];
}

function BusinessSearchActions({ actions }: Readonly<Props>) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button variant="outline" size="sm" className="rounded-full">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
      </Button>

      {actions.map((action) => (
        <BusinessSearchActionBadge
          key={action.value}
          label={action.label}
          action={action.action}
        />
      ))}
    </div>
  );
}

export default BusinessSearchActions;
