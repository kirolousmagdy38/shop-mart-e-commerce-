"use client";

import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { useContext, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import formatPrice from "@/lib/helperfunctions/formatPrice";

import Link from "next/link";
import { WishListProductsResponse } from "@/types/wishlist";
import { removeProductFromWishlist } from "@/actions/wishListAction";
import { addProductToCart } from "@/actions/cartAction";
import { toast } from "sonner";
import { CartContext } from "@/contexts/CartContext";
import DeleteCartModal from "../shared/DeleteModal";
import { WishListContext } from "@/contexts/WishListContext";

export default function MyWishList({
  myWishList,
}: {
  myWishList: WishListProductsResponse;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] =
    useState<WishListProductsResponse>(myWishList);

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isAddingAll, setIsAddingAll] = useState(false);
  const { setNumOfCartItems } = useContext(CartContext);
  const { setNumOfWishListItems } = useContext(WishListContext);
  async function removeItem(id: string) {
    try {
      setRemovingId(id);
      const response = await removeProductFromWishlist(id);
      setNumOfWishListItems(response.data.length); // sync navbar badge
      setWishlistItems((prev) => ({
        ...prev,
        count: prev.count - 1,
        data: prev.data.filter((item) => item._id !== id),
      }));
      toast.success("Product Removed from WishList");
    } catch (error) {
      toast.error("Failed to Remove Product");
    } finally {
      setRemovingId(null);
    }
  }
  async function addToCart(productId: string) {
    try {
      setLoadingId(productId);
      const response = await addProductToCart(productId);
      setNumOfCartItems(response.numOfCartItems);
      // console.log(response);

      toast.success("Product added successfully ");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingId(null);
    }
  }
  async function addAllToCart() {
    try {
      setIsAddingAll(true);
      const results = await Promise.all(
        wishlistItems.data.map((item) => addProductToCart(item._id)),
      );
      const lastResult = results[results.length - 1];
      setNumOfCartItems(lastResult.numOfCartItems);
      toast.success("All items added to cart");
    } catch (error) {
      toast.error("Failed to add all items to cart");
    } finally {
      setIsAddingAll(false);
    }
  }

  return (
    <section className={cn("py-16 md:py-24 ")}>
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              My Wishlist
            </h1>
            <p className="mt-1 text-muted-foreground">
              {wishlistItems.count} items saved
            </p>
          </div>
          {wishlistItems.count > 0 && (
            <Button
              variant="outline"
              onClick={addAllToCart}
              disabled={isAddingAll}
            >
              {isAddingAll ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <ShoppingCart className="mr-2 size-4" />
              )}
              Add All to Cart
            </Button>
          )}
        </div>

        {/* Grid */}
        {wishlistItems.count > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.data.map((item) => (
              <Card key={item.id} className="group gap-0 overflow-hidden p-0">
                <div className="relative">
                  <AspectRatio ratio={1} className="bg-muted">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className={cn("size-full object-cover")}
                    />
                  </AspectRatio>

                  {/* Remove Button */}

                  <DeleteCartModal
                    variant="removeWishlist"
                    onConfirm={() => removeItem(item._id)}
                    trigger={
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    }
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="leading-tight font-medium">{item.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      {formatPrice(item.price)}
                    </span>
                    {item.priceAfterDiscount && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => addToCart(item._id)}
                    disabled={loadingId === item._id || isAddingAll}
                  >
                    {loadingId === item._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-0">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Heart className="size-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Save items you love by clicking the heart icon on any product
              </p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
