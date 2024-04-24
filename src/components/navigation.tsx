import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { SignIn } from "@/components/auth/sign-in";
import UserOrSignIn from "./auth/user-or-sign-in";

export default function Navigation() {
  return (
    <nav className="flex justify-between p-4 border-b-2 border-zinc-500 dark:border-zinc-950">
      <h1 className="text-3xl font-semibold">
        <Link href={"/"}>Mind Sharp</Link>
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-64 p-2">
              <NavigationMenuLink>
                <Link href={"/vocab"}>Vocabulary Builder</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Three</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 items-center">
        <UserOrSignIn />
        <ModeToggle />
      </div>
    </nav>
  );
}
