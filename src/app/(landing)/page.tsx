import SearchInput from "~/components/search/search-input";
import { AppContainer } from "~/components/ui/app-container";

export default function HomePage() {
  return (
    <AppContainer as="main" padding="none">
      <section className="pt-10">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Discover & contact the worlds best businesses in your area
        </h1>
        <SearchInput defaultValue="" />
      </section>
    </AppContainer>
  );
}
