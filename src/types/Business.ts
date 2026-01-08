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
  reviewCount?: number;
  categories?: string[];
  description?: string;
  hours?: string;
  is24Hours?: boolean;
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
