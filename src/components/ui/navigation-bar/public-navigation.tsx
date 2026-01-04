import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-bar/navigation-menu";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ui/system/mode-toggle";
import { PUBLIC_NAV_ITEMS } from "~/lib/constants";

function PublicNavigation() {
  return (
    <>
      <NavigationMenu className="hidden items-center md:flex">
        <NavigationMenuList className="gap-6">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink
                href={item.href}
                className={navigationMenuTriggerStyle()}
              >
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop Action Buttons - Hidden on mobile */}
      <div className="hidden items-center gap-2 md:flex">
        <Button asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
        <ModeToggle />
      </div>
    </>
  );
}

export default PublicNavigation;
