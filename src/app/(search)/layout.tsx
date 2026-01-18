import SearchInput from "~/components/search/search-input";
import AppNavigationBar from "~/components/ui/navigation-bar/app-navigation-bar";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <AppNavigationBar isAppNav />
      <main className="min-h-screen">
        <div className="sticky top-0 z-40 mt-2">
          <SearchInput />
        </div>

        <div className="mt-2">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
