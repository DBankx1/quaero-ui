"use client";

import { Badge } from "~/components/ui/badge";

interface Props {
  label: string;
}

function BusinessSearchActionBadge({ label }: Readonly<Props>) {
  return (
    <Badge
      variant="secondary"
      className="hover:bg-secondary/80 cursor-pointer rounded-full px-3 py-1"
    >
      {label}
    </Badge>
  );
}

export default BusinessSearchActionBadge;
