"use client";

import SearchInput from "~/components/search/search-input";
import { AppContainer } from "~/components/ui/app-container";
import { Button } from "~/components/ui/button";
import { CategoryCarousel } from "~/components/ui/category/category-carousel";
import { useCategories } from "~/hooks/use-categories";

export default function HomePage() {
  const { data: categories, isLoading, isError } = useCategories();
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
    </AppContainer>
  );
}
