import { AppContainer } from "~/components/ui/app-container";
import AppNavigationBar from "~/components/ui/navigation-bar/app-navigation-bar";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // TODO: remove shadow - for development
    <div>
      <AppNavigationBar isAppNav={true} />
      {children}
    </div>
  );
}

export default Layout;
