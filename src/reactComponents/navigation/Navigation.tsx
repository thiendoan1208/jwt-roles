import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="sticky z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-xs transition-all">
      <section className="py-4 sm:flex sm:items-center sm:justify-around sm:mx-10 lg:block">
        <div className="container">
          <nav className="flex items-center justify-between mx-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                JWT Roles{" "}
              </span>
            </Link>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/users" className={navigationMenuTriggerStyle()}>
                    Users
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/project" className={navigationMenuTriggerStyle()}>
                    Project
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="https://www.facebook.com/ddthien12"
                    className={navigationMenuTriggerStyle()}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden items-center gap-4 lg:flex">
              <Button variant="outline">
                <Link to="/sign-in">Sign in</Link>
              </Button>
              <Button>
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
                <SheetHeader className="my-2"></SheetHeader>
                <div className="flex flex-col p-4">
                  <div className="flex flex-col gap-6">
                    <Link to="/users" className="font-medium">
                      Users
                    </Link>
                    <Link to="/project" className="font-medium">
                      Project
                    </Link>
                    <Link
                      to="https://www.facebook.com/ddthien12"
                      className="font-medium"
                    >
                      Contact
                    </Link>
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    <Button variant="outline">
                      <Link to="/sign-in">Sign in</Link>
                    </Button>
                    <Button>
                      <Link to="/sign-up">Sign up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </section>
    </div>
  );
};

export { Navbar };
