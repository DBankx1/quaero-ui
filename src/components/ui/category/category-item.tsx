"use client";

import { Badge } from "~/components/ui/badge";
import type { Category } from "~/types/category";
import { cn } from "~/lib/utils";
import * as React from "react";
import { useRouter } from "next/navigation";

interface CategoryItemProps {
  category: Category;
  variant: "default" | "pill" | "gradient";
}

const CategoryItem = React.memo(({ category, variant }: CategoryItemProps) => {
  const base =
    "flex-shrink-0 select-none cursor-pointer transition-all duration-200";
  const router = useRouter();

  const searchBusinessesByCategory = () => {
    router.push(`/search?category=${category.slug}`);
  };

  if (variant === "gradient") {
    return (
      <div
        className={cn(
          base,
          "rounded-full px-4 py-2 text-sm font-medium",
          "from-primary/80 to-primary bg-gradient-to-r",
          "text-primary-foreground",
          "hover:from-primary hover:to-primary/90 hover:scale-105 hover:shadow-lg active:scale-95",
        )}
        onClick={searchBusinessesByCategory}
      >
        {category.name}
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <Badge
        onClick={searchBusinessesByCategory}
        variant="secondary"
        className={cn(
          base,
          "rounded-full px-4 py-2",
          "hover:bg-secondary/80 hover:scale-105 hover:shadow-md active:scale-95",
        )}
      >
        {category.name}
      </Badge>
    );
  }

  return (
    <Badge
      onClick={searchBusinessesByCategory}
      variant="outline"
      className={cn(
        base,
        "rounded-xl px-4 py-2",
        "hover:bg-accent hover:border-primary/50 hover:scale-105 hover:shadow-md active:scale-95",
      )}
    >
      {category.name}
    </Badge>
  );
});

CategoryItem.displayName = "CategoryItem";

export default CategoryItem;
