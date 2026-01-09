// app/search/loading.tsx
import { Skeleton } from "~/components/ui/skeleton";
import { AppContainer } from "~/components/ui/app-container";

export default function SearchResultsSkeleton() {
  return (
    <main>
      {/* Results Header Skeleton */}
      <AppContainer
        paddingX="md"
        paddingY="sm"
        className="bg-muted/30 border-b"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 sm:w-80" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Filter chips skeleton */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-36 rounded-full" />
        </div>
      </AppContainer>

      {/* Main Content Area */}
      <div className="container mx-auto">
        <div className="flex min-h-[calc(100vh-200px)] flex-col lg:flex-row">
          {/* Business List Skeleton */}
          <div className="flex-2 lg:max-w-[60%] xl:max-w-[65%]">
            <div className="space-y-4 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <BusinessSearchItemSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Map Skeleton - Hidden on mobile */}
          <div className="hidden lg:block lg:flex-1">
            <div className="sticky top-[120px] h-[calc(100vh-140px)]">
              <MapSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function BusinessSearchItemSkeleton() {
  return (
    <div className="w-full border-b p-3">
      <div className="flex w-full flex-row items-start gap-4">
        {/* Logo skeleton */}
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg sm:h-20 sm:w-20" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title and rating row */}
          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-6 w-3/4 sm:w-64" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>

          {/* Address */}
          <div className="flex items-start gap-2">
            <Skeleton className="h-4 w-4 flex-shrink-0 rounded" />
            <Skeleton className="h-4 max-w-md flex-1" />
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Description lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Map section skeleton
 * Shows placeholder for the map area
 */
function MapSkeleton() {
  return (
    <div className="bg-muted/30 relative h-full w-full overflow-hidden rounded-r-lg border-l">
      {/* Map placeholder with subtle pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="mx-auto h-4 w-32" />
            <Skeleton className="mx-auto h-3 w-48" />
          </div>
        </div>
      </div>

      {/* Map marker placeholders scattered across the map */}
      <div className="absolute inset-0 p-8">
        <Skeleton className="absolute top-1/4 left-1/3 h-8 w-8 rounded-full" />
        <Skeleton className="absolute top-1/2 left-1/2 h-8 w-8 rounded-full" />
        <Skeleton className="absolute top-1/3 right-1/4 h-8 w-8 rounded-full" />
        <Skeleton className="absolute bottom-1/3 left-1/4 h-8 w-8 rounded-full" />
        <Skeleton className="absolute right-1/3 bottom-1/4 h-8 w-8 rounded-full" />
      </div>

      {/* Map controls skeleton - top right */}
      <div className="absolute top-4 right-4 space-y-2">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>

      {/* View map button skeleton - bottom center (for tablets) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
        <Skeleton className="h-12 w-32 rounded-lg" />
      </div>

      {/* Subtle grid pattern overlay for visual interest */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
