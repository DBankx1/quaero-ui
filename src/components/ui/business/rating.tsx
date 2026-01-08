// components/ui/rating.tsx
"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

const ratingVariants = cva("flex items-center", {
  variants: {
    size: {
      xs: "gap-0.5",
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
      xl: "gap-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const starVariants = cva("transition-all duration-200", {
  variants: {
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const ratingTextVariants = cva("font-semibold tabular-nums", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface RatingProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ratingVariants> {
  /** Rating value (0-5) */
  rating: number;
  /** Maximum rating (default: 5) */
  maxRating?: number;
  /** Show rating number beside stars */
  showRating?: boolean;
  /** Position of rating number */
  ratingPosition?: "left" | "right";
  /** Custom label for rating number */
  ratingLabel?: string;
  /** Show empty stars */
  showEmptyStars?: boolean;
  /** Enable animation on mount */
  animated?: boolean;
  /** Color variant for filled stars */
  variant?: "default" | "yellow" | "orange" | "primary" | "success";
  /** Enable interactive hover effect */
  interactive?: boolean;
  /** Callback when rating is clicked (for interactive mode) */
  onRatingChange?: (rating: number) => void;
  /** Show half stars for decimal ratings */
  allowHalfStars?: boolean;
}

const variantColors = {
  default: {
    filled: "fill-yellow-400 text-yellow-400",
    empty: "fill-muted text-muted",
    glow: "drop-shadow-[0_0_4px_rgba(250,204,21,0.4)]",
  },
  yellow: {
    filled: "fill-amber-400 text-amber-400",
    empty: "fill-muted text-muted",
    glow: "drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]",
  },
  orange: {
    filled: "fill-orange-500 text-orange-500",
    empty: "fill-muted text-muted",
    glow: "drop-shadow-[0_0_4px_rgba(249,115,22,0.4)]",
  },
  primary: {
    filled: "fill-primary text-primary",
    empty: "fill-muted text-muted",
    glow: "drop-shadow-[0_0_4px_rgba(var(--primary),0.4)]",
  },
  success: {
    filled: "fill-green-500 text-green-500",
    empty: "fill-muted text-muted",
    glow: "drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]",
  },
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      rating,
      maxRating = 5,
      showRating = false,
      ratingPosition = "right",
      ratingLabel,
      showEmptyStars = true,
      animated = false,
      variant = "default",
      interactive = false,
      onRatingChange,
      allowHalfStars = false,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    // Clamp rating between 0 and maxRating
    const clampedRating = Math.max(0, Math.min(maxRating, rating));
    const [hoveredRating, setHoveredRating] = React.useState<number | null>(
      null,
    );
    const colors = variantColors[variant];

    const displayRating =
      interactive && hoveredRating !== null ? hoveredRating : clampedRating;

    const getStarType = (index: number): "full" | "half" | "empty" => {
      const starValue = index + 1;
      if (displayRating >= starValue) return "full";
      if (allowHalfStars && displayRating >= starValue - 0.5) return "half";
      return "empty";
    };

    const handleStarClick = (index: number) => {
      if (interactive && onRatingChange) {
        onRatingChange(index + 1);
      }
    };

    const handleStarHover = (index: number) => {
      if (interactive) {
        setHoveredRating(index + 1);
      }
    };

    const handleMouseLeave = () => {
      if (interactive) {
        setHoveredRating(null);
      }
    };

    const renderStar = (index: number) => {
      const starType = getStarType(index);
      const isFilled = starType === "full" || starType === "half";
      const isHalf = starType === "half";

      const starElement = (
        <div className="relative inline-block">
          {isHalf ? (
            <>
              {/* Empty star background */}
              <Star className={cn(starVariants({ size }), colors.empty)} />
              {/* Half-filled star overlay */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <Star
                  className={cn(
                    starVariants({ size }),
                    colors.filled,
                    interactive && "group-hover:scale-110",
                    colors.glow,
                  )}
                />
              </div>
            </>
          ) : (
            <Star
              className={cn(
                starVariants({ size }),
                isFilled ? colors.filled : colors.empty,
                isFilled && colors.glow,
                interactive && "cursor-pointer group-hover:scale-110",
                "transition-all duration-200",
              )}
            />
          )}
        </div>
      );

      if (animated) {
        return (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.05,
            }}
            className="group"
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
          >
            {starElement}
          </motion.div>
        );
      }

      return (
        <div
          key={index}
          className="group"
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
        >
          {starElement}
        </div>
      );
    };

    const ratingNumber = (
      <div className="flex items-baseline gap-1">
        <span className={cn(ratingTextVariants({ size }), "text-foreground")}>
          {clampedRating.toFixed(1)}
        </span>
        {ratingLabel && (
          <span
            className={cn(
              "text-muted-foreground font-normal",
              size === "xs" ? "text-xs" : "text-sm",
            )}
          >
            {ratingLabel}
          </span>
        )}
      </div>
    );

    const stars = (
      <div
        className={cn(
          ratingVariants({ size }),
          interactive && "cursor-pointer",
        )}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from(
          { length: showEmptyStars ? maxRating : Math.ceil(clampedRating) },
          (_, i) => renderStar(i),
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        {showRating && ratingPosition === "left" && ratingNumber}
        {stars}
        {showRating && ratingPosition === "right" && ratingNumber}
      </div>
    );
  },
);

Rating.displayName = "Rating";

// Convenience wrapper for different styles
export const RatingBadge = React.forwardRef<
  HTMLDivElement,
  RatingProps & { badgeVariant?: "default" | "outline" | "secondary" }
>(({ badgeVariant = "default", className, ...props }, ref) => {
  const badgeStyles = {
    default:
      "bg-background border border-border rounded-full px-3 py-1.5 shadow-sm",
    outline: "border-2 border-border rounded-full px-3 py-1.5",
    secondary: "bg-muted border border-border/50 rounded-full px-3 py-1.5",
  };

  return (
    <div className={cn("inline-flex", badgeStyles[badgeVariant])}>
      <Rating ref={ref} className={className} {...props} />
    </div>
  );
});

RatingBadge.displayName = "RatingBadge";
