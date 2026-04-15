"use client";
import { useContext, useState } from "react";
import { Heart, RotateCcw, Eye, Plus, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/lib/helperfunctions/formatPrice";
import { addProductToCart } from "@/actions/cartAction";
import { toast } from "sonner";
import StarRating from "../shared/StarRating";
import { CartContext } from "@/contexts/CartContext";
import {
  addProductToWishList,
  removeProductFromWishlist,
} from "@/actions/wishListAction";
import { WishListContext } from "@/contexts/WishListContext";

type ProductCardProps = {
  image?: string;
  category?: string;
  name?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  originalPrice?: number;
  discount?: number;
  href?: string;
  productId: string;
};

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductCard({
  image,
  category = "Women's Fashion",
  name = "Product Name",
  rating = 0,
  reviewCount = 0,
  price = 0,
  originalPrice,
  discount,
  href,
  productId,
}: ProductCardProps) {
  const [wishListed, setWishListed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  const [removingFromWishlist, setRemovingFromWishlist] = useState(false);
  const { setNumOfCartItems } = useContext(CartContext);
 const{setNumOfWishListItems}= useContext(WishListContext);
  async function addToCart(productId: string) {
    try {
      setIsLoading(true);
      const response = await addProductToCart(productId);
      setNumOfCartItems(response.numOfCartItems);
      // console.log(response);

      toast.success("Product added successfully ");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishList(productId: string) {
    try {
      setAddingToWishlist(true);
      const response = await addProductToWishList(productId);
      // setNumOfWishListItems(response.numOfCartItems);
      // console.log(response);

      toast.success("Product added to WishList successfully ");
    } catch (error) {
      toast.error("Failed to add to WishList");
    } finally {
      setAddingToWishlist(false);
    }
  }

  async function removeFromWishList(productId: string) {
    try {
      setRemovingFromWishlist(true);
      const response = await removeProductFromWishlist(productId);
      // setNumOfCartItems(response.numOfCartItems);
      // console.log(response);

      toast.success("Product Removed from WishList successfully ");
    } catch (error) {
      toast.error("Failed to Removed from WishList");
    } finally {
      setRemovingFromWishlist(false);
    }
  }

  return (
    <div className="group relative transition-all duration-500 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1.25 overflow-hidden w-full shrink-0">
      <div className="relative bg-gray-100 h-70 flex items-center justify-center overflow-hidden">
        <Image
          fill
          src={image || "/placeholder.png"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 "
        />

        {/* Discount */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {[
            {
              icon: (
                <Heart
                  className={cn(
                    "w-3.5 h-3.5 transition-colors cursor-pointer hover:text-red-500",
                    wishListed ? "fill-red-500 text-red-500" : "text-gray-500",
                  )}
                />
              ),
              onClick: () => {
                {
                  wishListed
                    ? removeFromWishList(productId)
                    : addToWishList(productId);
                }
                setWishListed((prev) => !prev);
              },

              label: "Wishlist",
            },
            {
              icon: (
                <RotateCcw className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-black" />
              ),
              label: "Compare",
            },
            {
              icon: (
                <Eye className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-black" />
              ),
              label: "View",
              href,
            },
          ].map(({ icon, onClick, label, href: link }, index) => {
            const baseClass =
              "bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:border-gray-300 transition";

            return link ? (
              <Link
                key={label + index}
                href={link}
                className={baseClass}
                title={label}
              >
                {icon}
              </Link>
            ) : (
              <button
                key={label + index}
                onClick={onClick}
                className={baseClass}
                title={label}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 pt-3">
        <p className="text-xs text-gray-400 mb-0.5">{category}</p>

        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 min-h-10">
          {href ? (
            <Link
              href={`/products/${productId}`}
              className=" transition-colors"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>

        <StarRating rating={rating} />

        {/* Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(price)}
            </span>

            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <button
            className="h-9 w-9 rounded-full bg-gray-900 hover:bg-gray-700 flex items-center justify-center text-white shadow transition-transform hover:scale-105 active:scale-95"
            title="Add to cart"
            onClick={() => addToCart(productId)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
