export interface Business {
  _id: string | null;
  name: string;
  address: BusinessAddress;
  siteUrl: string;
  phone: string;
  email: string;
  rating: number;
  category_slugs: string[];
  services?: string[];
  is_online_shop: boolean;
  reviewCount?: number;
  categories?: string[];
  description?: string;
  hours?: string;
  is_24_hrs?: boolean;
  is_open_now?: boolean;
  logo?: string;
  image?: string;
  verified?: boolean;
  isVerified?: boolean;
  distance?: number;
  featured?: boolean;
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  post_code: string;
  country: string;
}

export interface BusinessSearchResponse {
  results: Business[];
  total_count: number;
}

export interface BusinessSearchAction {
  label: string;
  value: string;
  action?: any;
}

export type Filters = {
  is_online_shop?: boolean;
  is_24_hrs?: boolean;
  is_open_now?: boolean;
};

export type SortOption =
  | "relevance"
  | "rating"
  | "closest"
  | "reviewed"
  | "name";

export type BusinessSearchActions =
  | {
      type: "filter";
      label: string;
      key: keyof Filters;
    }
  | {
      type: "sort";
      label: string;
      value: SortOption;
    };

export const ACTIONS: BusinessSearchActions[] = [
  { type: "filter", label: "Shop Online", key: "is_online_shop" },
  { type: "filter", label: "Open Now", key: "is_open_now" },
  { type: "filter", label: "24/7", key: "is_24_hrs" },
  { type: "sort", label: "Highest Rated", value: "rating" },
];

export type UISearchAction = {
  label: string;
  active: boolean;
  onClick: () => void;
};
