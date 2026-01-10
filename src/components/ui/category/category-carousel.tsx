"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import type { Category } from "~/types/category";
import CategoryItem from "~/components/ui/category/category-item";

interface Props {
  categories: Category[];
  className?: string;
  variant?: "default" | "pill" | "gradient";
  speed?: number; // px per frame (default: slow)
}

export function CategoryCarousel({
  categories,
  className,
  variant = "default",
  speed = 0.3,
}: Readonly<Props>) {
  React.useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isPaused = React.useRef(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const animate = () => {
      if (!isPaused.current) {
        container.scrollLeft += speed;

        // When halfway reached, reset (infinite loop)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <div
        ref={containerRef}
        className="scrollbar-hide flex gap-2 overflow-x-scroll px-1 py-2"
      >
        {[...categories, ...categories].map((category, idx) => (
          <CategoryItem
            key={`${category.slug}-${idx}`}
            category={category}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
