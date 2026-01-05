export interface Category {
  slug: string;
  name: string;
  level: "primary" | "secondary";
  primary: string;
  secondary: string | null;
  parent_slug: string | null;
}

export interface CategoryCarouselProps {
  categories: Category[];
  selectedCategories?: string[];
  onCategoryClick?: (category: Category) => void;
  className?: string;
  variant?: "default" | "pill" | "gradient";
}
