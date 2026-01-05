import { Badge } from "~/components/ui/badge";
import type { Category } from "~/types/category";
import { cn } from "~/lib/utils";
import * as React from "react";

interface CategoryItemProps {
  category: Category;
  variant: "default" | "pill" | "gradient";
}

const CategoryItem = React.memo(({ category, variant }: CategoryItemProps) => {
  const base = "flex-shrink-0 select-none pointer-events-none";

  if (variant === "gradient") {
    return (
      <div
        className={cn(
          base,
          "rounded-full px-4 py-2 text-sm font-medium",
          "from-primary/80 to-primary bg-gradient-to-r",
          "text-primary-foreground",
        )}
      >
        {category.name}
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <Badge variant="secondary" className={cn(base, "rounded-full px-4 py-2")}>
        {category.name}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={cn(base, "rounded-xl px-4 py-2")}>
      {category.name}
    </Badge>
  );
});

CategoryItem.displayName = "CategoryItem";

export default CategoryItem;
