"use client";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

function BusinessSearchActionBadge({
  label,
  active,
  onClick,
}: Readonly<Props>) {
  return (
    <Badge
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "cursor-pointer rounded-full px-3 py-1 transition-colors select-none",
        active
          ? "bg-primary hover:bg-primary/90"
          : "bg-secondary text-primary hover:bg-secondary/80",
      )}
    >
      {label}
    </Badge>
  );
}

export default BusinessSearchActionBadge;
