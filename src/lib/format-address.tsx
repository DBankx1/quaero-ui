import type { BusinessAddress as Address } from "~/types/business";

export interface FormattedAddress {
  /** The formatted address string ready for display */
  formattedAddress: string;
  /** Whether the address has enough information for Google Maps geocoding */
  isGeocodable: boolean;
  /** Individual address components that exist */
  components: {
    street?: string;
    city?: string;
    state?: string;
    postCode?: string;
    country: string;
  };
}

/**
 * Formats an address dynamically based on available data.
 *
 * @param address - The address object to format
 * @returns FormattedAddress object with formatted string and geocodability flag
 *
 * @example
 * ```ts
 * const result = formatAddress({
 *   street: "123 Main St",
 *   city: "Toronto",
 *   state: "ON",
 *   post_code: "M5V 3A8",
 *   country: "Canada"
 * });
 * // result.formattedAddress: "123 Main St, Toronto, ON M5V 3A8, Canada"
 * // result.isGeocodable: true
 * ```
 */
export function formatAddress(address: Address): FormattedAddress {
  const { street, city, state, post_code, country } = address;

  // Normalize and filter out null/undefined/empty values
  const components: string[] = [];
  const existingComponents: FormattedAddress["components"] = { country };

  // Add street if present
  if (street?.trim()) {
    components.push(street.trim());
    existingComponents.street = street.trim();
  }

  // Add city if present
  if (city?.trim()) {
    components.push(city.trim());
    existingComponents.city = city.trim();
  }

  // Add state and postal code together if present (common format)
  const statePostalParts: string[] = [];

  if (state?.trim()) {
    statePostalParts.push(state.trim());
    existingComponents.state = state.trim();
  }

  if (post_code?.trim()) {
    statePostalParts.push(post_code.trim());
    existingComponents.postCode = post_code.trim();
  }

  if (statePostalParts.length > 0) {
    components.push(statePostalParts.join(" "));
  }

  // Always add country
  components.push(country.trim());

  // Format the address string
  const formattedAddress = components.join(", ");

  // Determine if address is geocodable (suitable for Google Maps)
  // Google Maps needs at minimum:
  // - Option 1: street + city + country
  // - Option 2: city + state + country
  // - Option 3: city + country (less reliable but works)
  const hasStreet = !!existingComponents.street;
  const hasCity = !!existingComponents.city;
  const hasState = !!existingComponents.state;
  const hasPostCode = !!existingComponents.postCode;

  const isGeocodable =
    (hasStreet && hasCity) || // Street + city is good
    (hasCity && hasState) || // City + state is good
    (hasCity && hasPostCode) || // City + postal code is good
    hasCity; // Just city might work but less reliable

  return {
    formattedAddress,
    isGeocodable,
    components: existingComponents,
  };
}

/**
 * Formats an address for Google Maps URL encoding
 *
 * @param address - The address object to format
 * @returns Encoded address string suitable for Google Maps URLs, or null if not geocodable
 *
 * @example
 * ```ts
 * const mapsUrl = formatAddressForGoogleMaps(address);
 * if (mapsUrl) {
 *   window.open(`https://www.google.com/maps/search/?api=1&query=${mapsUrl}`);
 * }
 * ```
 */
export function formatAddressForGoogleMaps(address: Address): string | null {
  const result = formatAddress(address);

  if (!result.isGeocodable) {
    return null;
  }

  return encodeURIComponent(result.formattedAddress);
}

/**
 * Creates a Google Maps directions URL if address is geocodable
 *
 * @param address - The destination address
 * @returns Google Maps directions URL or null if not geocodable
 */
export function getGoogleMapsDirectionsUrl(address: Address): string | null {
  const encodedAddress = formatAddressForGoogleMaps(address);

  if (!encodedAddress) {
    return null;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
}

/**
 * Gets a short address format (typically street and city only)
 *
 * @param address - The address object
 * @returns Short formatted address
 *
 * @example
 * ```ts
 * getShortAddress(address); // "123 Main St, Toronto"
 * ```
 */
export function getShortAddress(address: Address): string {
  const { street, city } = address;
  const parts: string[] = [];

  if (street?.trim()) parts.push(street.trim());
  if (city?.trim()) parts.push(city.trim());

  return parts.length > 0 ? parts.join(", ") : address.country;
}

/**
 * Validates if an address has minimum required data
 *
 * @param address - The address object to validate
 * @returns Validation result with details
 */
export function validateAddress(address: Address): {
  isValid: boolean;
  isComplete: boolean;
  missingFields: string[];
} {
  const missingFields: string[] = [];

  if (!address.street?.trim()) missingFields.push("street");
  if (!address.city?.trim()) missingFields.push("city");
  if (!address.state?.trim()) missingFields.push("state");
  if (!address.post_code?.trim()) missingFields.push("post_code");

  const hasMinimumData = !!address.city?.trim() || !!address.street?.trim();
  const isComplete = missingFields.length === 0;

  return {
    isValid: hasMinimumData,
    isComplete,
    missingFields,
  };
}
