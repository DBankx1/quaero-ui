export interface Business {
  name: string;
  address: BusinessAddress;
  siteUrl: string;
  phone: string;
  email: string;
  rating: number;
  category_slugs: string[];
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  post_code: string;
  country: string;
}
