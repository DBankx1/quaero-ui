"use client";

import { Badge } from "~/components/ui/badge";
import { badgeActive, badgeBase, badgeHover } from "~/lib/styles";
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
      className={cn(badgeBase, active ? badgeActive : badgeHover) + " h-8"}
    >
      {label}
    </Badge>
  );
}

export default BusinessSearchActionBadge;
