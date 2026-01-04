// components/ui/app-container.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const containerVariants = cva(
  "w-full mx-auto", // Base styles - full width, centered
  {
    variants: {
      // Max width variants
      size: {
        sm: "max-w-2xl", // 672px - Narrow content (blogs, forms)
        md: "max-w-4xl", // 896px - Medium content (dashboards)
        lg: "max-w-6xl", // 1152px - Wide content (data tables)
        xl: "max-w-7xl", // 1280px - Extra wide (landing pages)
        "2xl": "max-w-screen-2xl", // 1536px - Full width with constraints
        full: "max-w-none", // No max width
      },

      // Padding variants (x-axis and y-axis)
      padding: {
        none: "px-0 py-0",
        sm: "px-4 py-4 md:px-6 md:py-6",
        md: "px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10",
        lg: "px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16",
        xl: "px-8 py-12 md:px-16 md:py-16 lg:px-24 lg:py-20",
      },

      // Padding X-axis only (horizontal)
      paddingX: {
        none: "px-0",
        sm: "px-4 md:px-6",
        md: "px-4 md:px-8 lg:px-12",
        lg: "px-6 md:px-12 lg:px-16",
        xl: "px-8 md:px-16 lg:px-24",
      },

      // Padding Y-axis only (vertical)
      paddingY: {
        none: "py-0",
        sm: "py-4 md:py-6",
        md: "py-6 md:py-8 lg:py-10",
        lg: "py-8 md:py-12 lg:py-16",
        xl: "py-12 md:py-16 lg:py-20",
      },

      // Background variants
      background: {
        none: "",
        white: "bg-white",
        muted: "bg-muted",
        accent: "bg-accent",
        card: "bg-card",
      },

      // Border variants
      border: {
        none: "",
        default: "border",
        top: "border-t",
        bottom: "border-b",
      },

      // Shadow variants
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },

      // Rounded corners
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "md",
      background: "none",
      border: "none",
      shadow: "none",
      rounded: "none",
    },
  },
);

export interface AppContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const AppContainer = React.forwardRef<HTMLDivElement, AppContainerProps>(
  (
    {
      className,
      size,
      padding,
      paddingX,
      paddingY,
      background,
      border,
      shadow,
      rounded,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({
            size,
            // If paddingX or paddingY is specified, ignore padding
            padding: paddingX || paddingY ? "none" : padding,
            paddingX,
            paddingY,
            background,
            border,
            shadow,
            rounded,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

AppContainer.displayName = "AppContainer";

export { AppContainer, containerVariants };
