import { AppContainer } from "~/components/ui/app-container";
import type { Business, BusinessSearchResponse } from "~/types/business";
import BusinessSearchItem from "~/components/ui/business/business-search-item";
import { MapPin } from "lucide-react";
import { Button } from "../button";

interface Props {
  businesses: BusinessSearchResponse;
}

function BusinessList({ businesses }: Readonly<Props>) {
  return (
    <div className="flex-2 lg:max-w-[60%] xl:max-w-[65%]">
      <div className="p-4">
        {businesses.results.length > 0 ? (
          <div className="flex flex-col gap-2">
            {businesses.results.map((business: Business, index: number) => (
              <BusinessSearchItem key={business._id} business={business} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted mb-4 rounded-full p-6">
              <MapPin className="text-muted-foreground h-12 w-12" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No businesses found</h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search criteria or filters to find what you're
              looking for.
            </p>
          </div>
        )}

        {/* Rate these results link */}
        {businesses.results.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="link" className="text-sm">
              Rate these results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessList;
