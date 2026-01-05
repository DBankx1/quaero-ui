"use client";

import SearchInput from "~/components/search/search-input";
import { AppContainer } from "~/components/ui/app-container";
import { Button } from "~/components/ui/button";
import { CategoryCarousel } from "~/components/ui/category/category-carousel";
import PlatformStatCard from "~/components/ui/landing/platform-stat-card";
import PlatformStatCardSkeleton from "~/components/ui/landing/platform-stat-card-skelenton";
import { useBusinessesIndexedCount } from "~/hooks/use-businesses";
import { useCategories } from "~/hooks/use-categories";

export default function HomePage() {
  const { data: categories, isLoading, isError } = useCategories();
  const {
    data: businessCount,
    isLoading: isLoadingBusinessCount,
    isError: isErrorBusinessCount,
  } = useBusinessesIndexedCount();
  return (
    <AppContainer as="main" padding="none">
      <AppContainer
        as="section"
        className="align-center flex flex-col gap-10 pt-10"
        paddingY="lg"
      >
        <div>
          <h1 className="mb-4 text-center text-4xl font-bold">
            Discover & contact the worlds best businesses in your area
          </h1>
          <SearchInput defaultValue="" />
        </div>

        <div className="flex items-center justify-center">
          <Button className="h-12 w-fit">Browse Businesses</Button>
        </div>
      </AppContainer>

      <AppContainer as="section" padding="none">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading categories</p>}
        {categories && <CategoryCarousel categories={categories} />}
      </AppContainer>

      <AppContainer as="section" paddingY="lg">
        <h2 className="text-center text-sm font-bold uppercase">
          platform stats
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-8 md:flex-row">
          {isLoadingBusinessCount ? (
            <PlatformStatCardSkeleton />
          ) : (
            <PlatformStatCard
              content={`${businessCount}+`}
              footerText="Businesses Indexed"
            />
          )}
          <PlatformStatCard content="<5 Secs" footerText="Time to contact" />
          <PlatformStatCard content="34k+" footerText="Categories" />
        </div>
      </AppContainer>
    </AppContainer>
  );
}
