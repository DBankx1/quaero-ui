"use client";

import { useSearchParams } from "next/navigation";
import SearchInput from "~/components/search/search-input";
import BusinessList from "~/components/ui/business/business-list";
import BusinessResultsHeader from "~/components/ui/business/business-results-header";
import BusinessSearchMap from "~/components/ui/business/business-search-map";
import { Button } from "~/components/ui/button";
import { MapPin } from "lucide-react";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("s") || "";

  const businesses = {
    results: [
      {
        _id: 1,
        name: "Reuter Roofing",
        address: {
          street: "90 Rankin Street, Unit 11",
          city: "Waterloo",
          state: "ON",
          post_code: "N2V 2B3",
          country: "Canada",
        },
        siteUrl: "https://www.reuteroofing.com",
        phone: "(519) 884-7663",
        email: "info@reuteroofing.com",
        rating: 4,
        category_slugs: ["csa.roofing"],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        _id: 2,
        name: "Kienitz Roofing",
        address: {
          street: "6 Colby Court, Unit 5",
          city: "Waterloo",
          state: "ON",
          post_code: "N2V 1Y9",
          country: "Canada",
        },
        siteUrl: "https://www.kienitzroofing.com",
        phone: "(519) 884-7663",
        email: "info@kienitzroofing.com",
        rating: 4,
        category_slugs: ["csa.roofing"],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        _id: 3,
        name: "Allan Beach Roofing",
        address: {
          street: "386 Lakeview Drive",
          city: "Waterloo",
          state: "ON",
          post_code: "N2L 4Z6",
          country: "Canada",
        },
        siteUrl: "https://www.allanbeachroofing.com",
        phone: "(519) 884-7663",
        email: "info@allanbeachroofing.com",
        rating: 4,
        category_slugs: ["csa.roofing"],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        _id: 4,
        name: "Custom Contracting Roofing & Eavestrough Repair Waterloo",
        address: {
          street: "165 Margaret Ave S",
          city: "Waterloo",
          state: "ON",
          post_code: "N2J 2E3",
          country: "Canada",
        },
        siteUrl: "https://www.customcontracting.ca",
        phone: "(519) 884-7663",
        email: "info@customcontracting.ca",
        rating: 5,
        category_slugs: ["csa.roofing"],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
    total_count: 4,
  };

  console.log(businesses);
  return (
    <main className="min-h-screen">
      {/* TODO: change top-0 to top-[height_of_nav] */}
      <div className="sticky top-0 z-40">
        <SearchInput
          defaultValue={query}
          onSubmit={(values) => console.log(values)}
        />
      </div>

      <BusinessResultsHeader
        searchQuery={query}
        businessSearchResponse={businesses}
      />

      <div className="container mx-auto">
        <div className="flex min-h-[calc(100vh-200px)] flex-col lg:flex-row">
          <BusinessList businesses={businesses} />
          <BusinessSearchMap />
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 lg:hidden">
        <Button size="lg" className="shadow-lg">
          <MapPin className="mr-2 h-4 w-4" />
          View Map
        </Button>
      </div>
    </main>
  );
}

export default SearchPage;
