"use client";

import type { Business } from "~/types/business";
import { Logo } from "../logo/logo";
import { Rating } from "./rating";
import { Globe, MapPin, MessageSquare, Navigation, Phone } from "lucide-react";
import { Badge } from "../badge";
import * as React from "react";
import TextReadMore from "../text-read-more";
import { Button } from "../button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatAddress } from "~/lib/format-address";
import { cn } from "~/lib/utils";

interface Props {
  business: Business;
}

function BusinessSearchItem({ business }: Readonly<Props>) {
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(false);

  const address = formatAddress(business.address);
  const businessUrl = `/business/${encodeURIComponent(business.name)}`;

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/search?category=${categorySlug}`);
  };

  return (
    <div className="group hover:bg-accent/20 relative w-full border-b py-3 transition-colors duration-200">
      <Link
        href={businessUrl}
        className="hover:text-primary after:absolute after:inset-0 after:z-0"
      >
        <span className="sr-only">View {business.name} details</span>
      </Link>

      <div className="flex w-full flex-row items-start gap-4">
        <Logo business={business} />

        <div className="relative z-10 flex-1">
          <div className="mb-2 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <h3 className="sm:text-md group-hover:text-primary line-clamp-1 text-base font-semibold transition-colors">
              {business.name}
            </h3>

            <Rating
              rating={business.rating}
              showRating
              allowHalfStars
              animated
              className="relative z-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={
                address.isGeocodable
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.formattedAddress)}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative z-10 flex items-start gap-1 text-sm transition-opacity",
                address.isGeocodable && "cursor-pointer hover:opacity-60",
              )}
              onClick={(e) => {
                if (!address.isGeocodable) {
                  e.preventDefault();
                }
              }}
            >
              <MapPin className="text-primary h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{address.formattedAddress}</span>
            </a>

            {business.category_slugs && business.category_slugs.length > 0 && (
              <div className="relative z-10 flex flex-wrap gap-2">
                {business.category_slugs.slice(0, 4).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className=""
                  >
                    <Badge
                      variant="secondary"
                      className="from-muted to-muted/50 hover:from-primary/10 border-border/50 cursor-pointer border bg-gradient-to-r text-xs font-medium shadow-sm transition-all duration-300 hover:scale-105 hover:to-purple-500/10"
                    >
                      {category}
                    </Badge>
                  </button>
                ))}
                {business.category_slugs.length > 4 && (
                  <Badge variant="outline" className="text-xs font-medium">
                    +{business.category_slugs.length - 4}
                  </Badge>
                )}
              </div>
            )}

            {/* Description */}
            {business.description && (
              <div className="relative z-10">
                <TextReadMore
                  text={business.description}
                  isExpanded={isDescriptionExpanded}
                  setIsExpanded={setIsDescriptionExpanded}
                />
              </div>
            )}

            <div className="relative z-10 flex w-full flex-row gap-4 sm:flex-col sm:flex-row">
              {business.phone && (
                <Button
                  size="lg"
                  className="from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-primary/30 hover:shadow-primary/40 gap-2 bg-gradient-to-r font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                  asChild
                >
                  <a href={`tel:${business.phone}`}>
                    <Phone className="h-4 w-4" />
                    <span className="hidden sm:inline">Call Now</span>
                  </a>
                </Button>
              )}

              {business.siteUrl && (
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-accent hover:border-primary/50 gap-2 border-2 font-medium shadow-sm transition-all duration-300 hover:shadow-md"
                  asChild
                >
                  <a
                    href={business.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">Website</span>
                  </a>
                </Button>
              )}

              {business.email && (
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-accent hover:border-primary/50 gap-2 border-2 font-medium shadow-sm transition-all duration-300 hover:shadow-md"
                  asChild
                >
                  <Link href={`/business/${business._id}/contact`}>
                    <MessageSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Message</span>
                  </Link>
                </Button>
              )}

              {address.isGeocodable && (
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-accent hover:border-primary/50 gap-2 border-2 font-medium shadow-sm transition-all duration-300 hover:shadow-md"
                  asChild
                >
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      address.formattedAddress,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4" />
                    <span className="hidden sm:inline">Directions</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessSearchItem;
