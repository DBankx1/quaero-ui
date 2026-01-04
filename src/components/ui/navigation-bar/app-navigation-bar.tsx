"use client";
import { AppContainer } from "~/components/ui/app-container";
import Link from "next/link";
import PublicNavigation from "~/components/ui/navigation-bar/public-navigation";
import AppNavContent from "./app-nav-content";
import { PublicNavigationMobile } from "./public-navigation-mobile";
import * as React from "react";

interface AppNavigationProps {
  isAppNav: boolean;
}

function AppNavigationBar({ isAppNav }: Readonly<AppNavigationProps>) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <AppContainer size="xl" paddingX="none" className="h-16">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Quaero</span>
          </Link>

          {isAppNav ? (
            <AppNavContent />
          ) : (
            <>
              <PublicNavigation />
              <PublicNavigationMobile
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
              />
            </>
          )}
        </div>
      </AppContainer>
    </header>
  );
}

export default AppNavigationBar;
