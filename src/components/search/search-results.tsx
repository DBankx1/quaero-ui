import { businessesAPI } from "~/lib/api/services/businesses";
import SearchResultsClient from "./search-results-client";

interface Props {
  query: string;
}

export default async function SearchResults({ query }: Readonly<Props>) {
  // const businesses = await businessesAPI.search(query);

  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const businesses = {
    results: [
      {
        _id: null,
        name: "Don Alfonso 1890",
        address: {
          street: "1 Harbour Square 38th Floor",
          city: "Toronto",
          state: "ON",
          post_code: "M5J 1A6",
          country: "Canada",
        },
        logo: "https://cdn.brandfetch.io/donalfonsotoronto.com?c=1idknqaIOXf052mhQty",
        description:
          "Don Alfonso 1890 is a Michelin-starred Italian restaurant located on the 38th floor of the Westin Harbour Castle in Toronto. It offers modern Mediterranean cuisine with panoramic views of Lake Ontario and the city skyline.",
        siteUrl: "https://www.donalfonsotoronto.com/",
        phone: "+1 416-363-1888",
        email: "info@donalfonsotoronto.com",
        rating: 4.7,
        is_online_shop: false,
        category_slugs: ["csa.italian", "csa.restaurants"],
      },
      {
        _id: null,
        name: "Osteria Giulia",
        address: {
          street: "134 Avenue Road",
          city: "Toronto",
          state: "ON",
          post_code: "M5R 2H6",
          country: "Canada",
        },
        logo: "https://cdn.brandfetch.io/osteriagiulia.ca?c=1idknqaIOXf052mhQty",
        description:
          "Osteria Giulia is a Michelin-starred Italian restaurant in Toronto's Yorkville neighborhood, focusing on Northern Italian cuisine with an emphasis on pasta and seafood, led by Chef Rob Rossi.",
        siteUrl: "https://osteriagiulia.ca/",
        phone: "+1 416-551-9999",
        email: "info@osteriagiulia.ca",
        rating: 4.6,
        is_online_shop: false,
        category_slugs: ["csa.italian", "csa.restaurants"],
      },
      {
        _id: null,
        name: "Giulietta",
        address: {
          street: "972 College Street",
          city: "Toronto",
          state: "ON",
          post_code: "M6H 1A5",
          country: "Canada",
        },
        logo: "https://cdn.brandfetch.io/giulietta.ca?c=1idknqaIOXf052mhQty",
        description:
          "Giulietta is a contemporary Italian restaurant in Toronto's Little Italy, offering a refined dining experience with a menu that balances simplicity and sophistication, led by Chef Rob Rossi.",
        siteUrl: "https://giulietta.ca/",
        phone: "+1 416-551-9999",
        email: "info@giulietta.ca",
        rating: 4.5,
        is_online_shop: false,
        category_slugs: ["csa.italian", "csa.restaurants"],
      },
      {
        _id: null,
        name: "Sotto Sotto",
        address: {
          street: "120 Avenue Road",
          city: "Toronto",
          state: "ON",
          post_code: "M5R 2H4",
          country: "Canada",
        },
        logo: "https://cdn.brandfetch.io/sottosotto.ca?c=1idknqaIOXf052mhQty",
        description:
          "Sotto Sotto is an intimate Italian restaurant in Toronto's Yorkville neighborhood, known for its authentic Italian fare and romantic ambiance, making it a favorite for special occasions.",
        siteUrl: "https://sottosotto.ca/",
        phone: "+1 416-962-0011",
        email: "info@sottosotto.ca",
        rating: 4.4,
        is_online_shop: false,
        category_slugs: ["csa.italian", "csa.restaurants"],
      },
    ],
    total_count: 4,
  };

  if (!businesses) throw new Error("Failed to load search results");

  return <SearchResultsClient businesses={businesses} searchQuery={query} />;
}
