import { MapPin } from "lucide-react";
import { Button } from "../button";

function BusinessSearchMap() {
  return (
    <div className="relative hidden lg:block lg:flex-1">
      <div className="bg-muted sticky top-[120px] h-[calc(100vh-140px)] border-l">
        <div className="text-muted-foreground flex h-full w-full items-center justify-center">
          {/* Placeholder for map - replace with actual map component */}
          <div className="p-8 text-center">
            <MapPin className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
            <p className="text-lg font-medium">Map View</p>
            <p className="mt-2 text-sm">Integrate your map component here</p>
          </div>
        </div>

        {/* View Map Button - Shows on tablets */}
        <Button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 shadow-lg lg:hidden"
          size="lg"
        >
          <MapPin className="mr-2 h-4 w-4" />
          View Map
        </Button>
      </div>
    </div>
  );
}

export default BusinessSearchMap;
