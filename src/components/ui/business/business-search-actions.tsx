"use client";

import { SlidersHorizontal } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import BusinessSearchActionBadge from "./business-search-action-badge";

const businessSearchActions = [
  {
    label: "Shop Online",
    value: "shop_online",
  },
  {
    label: "Open Now",
    value: "open_now",
  },
  {
    label: "24/7",
    value: "24_7",
  },
  {
    label: "Highest Rated",
    value: "highest_rated",
  },
];

function BusinessSearchActions() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button variant="outline" size="sm" className="rounded-full">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
      </Button>

      {businessSearchActions.map((action) => (
        <BusinessSearchActionBadge key={action.value} label={action.label} />
      ))}
    </div>
  );
}

export default BusinessSearchActions;
