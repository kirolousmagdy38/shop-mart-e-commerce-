"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  Headset,
  User,
  Menu,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CartContext } from "@/contexts/CartContext";
import { WishListContext } from "@/contexts/WishListContext";
import { signOut, useSession } from "next-auth/react";

interface NavCategory {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Brands", href: "/brands" },
];

const CATEGORIES: NavCategory[] = [
  { label: "All Categories", href: "/categories" },
  { label: "Electronics", href: "/categories/6439d2d167d9aa4ca970649f" },
  { label: "Women's Fashion", href: "/categories/6439d58a0049ad0b52b9003f" },
  { label: "Men's Fashion", href: "/categories/6439d5b90049ad0b52b90048" },
  { label: "Beauty & Health", href: "/categories/6439d30b67d9aa4ca97064b1" },
];
const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

function SearchBar({ className }: { className?: string }) {
  return (
    <form className={cn("relative", className)}>
      <Input
        type="text"
        placeholder="Search for products, brands and more..."
        className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full"
      >
        <Search className="size-4" />
      </Button>
    </form>
  );
}

function SupportLink({ className }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={cn(
        "hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity",
        className,
      )}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Headset className="text-primary size-5" />
      </div>
      <div className="text-xs">
        <div className="text-gray-400">Support</div>
        <div className="font-semibold text-gray-700">24/7 Help</div>
      </div>
    </Link>
  );
}

function CartButton({
  numOfCartItems,
  isLoading,
}: {
  numOfCartItems: number;
  isLoading: boolean;
}) {
  return (
    <Link
      href="/cart"
      title="Cart"
      className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
    >
      <ShoppingCart className="size-5 text-gray-500 group-hover:text-primary transition-colors" />
      {numOfCartItems > 0 && (
        <Badge className="absolute top-0.5 right-0.5 size-4.5 rounded-full p-0 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
          {isLoading ? (
            <Loader2 className="size-2.5 animate-spin" />
          ) : (
            numOfCartItems
          )}
        </Badge>
      )}
    </Link>
  );
}

function WishlistButton({
  numOfWishListItems,
  isLoading,
}: {
  numOfWishListItems: number;
  isLoading: boolean;
}) {
  return (
    <Link
      href="/wishlist"
      title="Wishlist"
      className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
    >
      <Heart className="size-5 text-gray-500 group-hover:text-primary transition-colors" />
      {numOfWishListItems > 0 && (
        <Badge className="absolute top-0.5 right-0.5 size-4.5 rounded-full p-0 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
          {isLoading ? (
            <Loader2 className="size-2.5 animate-spin" />
          ) : (
            numOfWishListItems
          )}
        </Badge>
      )}
    </Link>
  );
}

function CategoriesDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1.5 text-gray-700 hover:text-primary font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent px-0">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-52 py-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileDrawer({
  numOfCartItems,
  numOfWishListItems,
}: {
  numOfCartItems: number;
  numOfWishListItems: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="lg:hidden ml-1 w-10 h-10 rounded-full"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-80 max-w-[85vw] p-0 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <span className="bg-black p-2 px-4 rounded-xl text-white font-extrabold text-3xl">
            S
          </span>
        </div>

        {/* Search */}
        <form className="p-4 border-b border-gray-100">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </form>

        {/* Nav Links */}
        <nav className="p-4">
          <div className="space-y-1">
            {MOBILE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <Separator className="mx-4 w-auto" />

        {/* Wishlist & Cart */}
        <div className="p-4 space-y-1">
          <Link
            href="/wishlist"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <Heart className="size-4 text-red-500" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
            {numOfWishListItems > 0 && (
              <Badge className="text-xs font-bold px-2.5 py-1 rounded-full">
                {numOfWishListItems}
              </Badge>
            )}
          </Link>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="size-4 text-primary" />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
            {numOfCartItems > 0 && (
              <Badge className="text-xs font-bold px-2.5 py-1 rounded-full">
                {numOfCartItems}
              </Badge>
            )}
          </Link>
        </div>

        <Separator className="mx-4 w-auto" />

        {/* Auth Buttons */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button asChild className="rounded-xl">
              <Link href="/login" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-2 border-primary text-primary hover:bg-primary/5"
            >
              <Link href="/register" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>

        {/* Support */}
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-primary/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Headset className="size-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700">
              Need Help?
            </div>
            <div className="text-sm text-primary">Contact Support</div>
          </div>
        </Link>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  const { numOfCartItems, isCartLoading } = useContext(CartContext);
  const { numOfWishListItems, isWishListLoading } = useContext(WishListContext);
  const session = useSession();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2">
              <span className="bg-black p-2 px-4 rounded-xl text-white font-extrabold text-3xl">
                S
              </span>
              <span className="font-extrabold text-3xl">ShopMart</span>
            </Link>

            {/* Desktop Search */}
            <SearchBar className="hidden lg:flex flex-1 max-w-2xl" />

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-6">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium cursor-pointer transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <CategoriesDropdown />

              {NAV_LINKS.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              <SupportLink />

              {session.status == "authenticated" && (
                <>
                  {" "}
                  <WishlistButton
                    numOfWishListItems={numOfWishListItems}
                    isLoading={isWishListLoading}
                  />
                  <CartButton
                    numOfCartItems={numOfCartItems}
                    isLoading={isCartLoading}
                  />
                </>
              )}

              {/* Sign In — Desktop */}
              {session.status == "unauthenticated" ? (
                <Button
                  asChild
                  className="hidden lg:flex items-center gap-2 ml-2 rounded-full shadow-sm"
                >
                  <Link href="/auth/signin">
                    <User className="size-3" />
                    Sign In
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
                  className="hidden lg:flex items-center gap-2 ml-2 px-4 py-2 rounded-full 
             bg-linear-to-r from-red-500 to-red-600 
             text-white font-medium 
             shadow-md hover:shadow-lg 
             hover:scale-[1.02] active:scale-[0.98]
             transition-all duration-200"
                >
                  Log out
                </Button>
              )}

              <MobileDrawer
                numOfCartItems={numOfCartItems}
                numOfWishListItems={numOfWishListItems}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
