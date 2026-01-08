"use cache";

import SearchInput from "~/components/search/search-input";
import { AppContainer } from "~/components/ui/app-container";
import { Button } from "~/components/ui/button";
import { CategoryCarousel } from "~/components/ui/category/category-carousel";
import PlatformStatCard from "~/components/ui/landing/platform-stat-card";
import { businessesAPI } from "~/lib/api/services/businesses";
import { categoriesAPI } from "~/lib/api/services/categories";

export default async function HomePage() {
  const categories = await categoriesAPI.getAll();
  const businessCount = await businessesAPI.getIndexedBusinessCount();
  return (
    <AppContainer as="main" padding="none">
      <AppContainer
        as="section"
        className="align-center flex flex-col gap-10 pt-10"
        paddingY="lg"
      >
        <div>
          <h1 className="mb-4 text-center text-4xl font-bold">
            Discover & contact the best local businesses in your area
          </h1>
          <SearchInput defaultValue="" />
        </div>

        <div className="flex items-center justify-center">
          <Button className="h-12 w-fit">Browse Businesses</Button>
        </div>
      </AppContainer>

      <AppContainer as="section" padding="none">
        {categories && (
          <CategoryCarousel variant="pill" categories={categories} />
        )}
      </AppContainer>

      <AppContainer as="section" paddingY="lg">
        <h2 className="text-center text-sm font-bold uppercase">
          platform stats
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-8 md:flex-row">
          <PlatformStatCard
            content={`${businessCount}+`}
            footerText="Businesses Indexed"
          />
          <PlatformStatCard content="<5 Secs" footerText="Time to contact" />
          <PlatformStatCard content="34k+" footerText="Categories" />
        </div>
      </AppContainer>
    </AppContainer>
  );
}
