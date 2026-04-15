"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  TruckIcon,
  RotateCcw,
  ShieldHalf,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { FaBolt } from "react-icons/fa6";
import StarRating from "../shared/StarRating";
import { addProductToCart } from "@/actions/cartAction";
import { toast } from "sonner";
import formatPrice from "@/lib/helperfunctions/formatPrice";
import { CartContext } from "@/contexts/CartContext";
import { WishListContext } from "@/contexts/WishListContext";
import {
  addProductToWishList,
  removeProductFromWishlist,
} from "@/actions/wishListAction";

interface ProductInfoProps {
  product: Product;
}

const perks = [
  { icon: TruckIcon, title: "Free Delivery", subtitle: "Orders over $50" },
  { icon: RotateCcw, title: "30 Days Return", subtitle: "Money back" },
  { icon: ShieldHalf, title: "Secure Payment", subtitle: "100% Protected" },
];

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [wishListed, setWishListed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [removingFromWishlist, setRemovingFromWishlist] = useState(false);
  const totalPrice = (product?.priceAfterDiscount ?? product?.price) * quantity;

  const { setNumOfCartItems } = useContext(CartContext);
  const { setNumOfWishListItems } = useContext(WishListContext);
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
    console.log("addToWishList called with:", productId);
    try {
      setAddingToWishlist(true);
      console.log("before API call");
      const response = await addProductToWishList(productId);
      console.log("wishlist response:", response);
      setNumOfWishListItems(response.data.length);
      toast.success("Product added to WishList successfully");
    } catch (error) {
      console.log("ERROR:", error);
      toast.error("Failed to add to WishList");
    } finally {
      setAddingToWishlist(false);
    }
  }
  async function removeFromWishList(productId: string) {
    try {
      setRemovingFromWishlist(true);
      const response = await removeProductFromWishlist(productId);
      setNumOfWishListItems(response.data.length);
      toast.success("Product removed from WishList successfully");
    } catch (error) {
      toast.error("Failed to remove from WishList");
    } finally {
      setRemovingFromWishlist(false);
    }
  }
  return (
    <div className="lg:w-3/4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 items-baseline">
          <Link href={`/categories/${product?.category?._id}`}>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
            >
              {product?.category?.name}
            </Badge>
          </Link>
          <Badge variant="secondary">{product?.brand?.name}</Badge>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {product?.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={product?.ratingsAverage} />
          <span className="text-sm text-muted-foreground">
            {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product?.priceAfterDiscount ?? product?.price)}
          </span>
          {product?.priceAfterDiscount && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product?.price)} EGP
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-6">
          <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            In Stock
          </span>
        </div>

        {/* Description */}
        <Separator className="mb-5" />
        <p className="text-muted-foreground leading-relaxed mb-6 ">
          {product?.description}
        </p>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-11 w-11 text-gray-600 hover:text-primary cursor-pointer"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-16 text-center text-lg font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-11 w-11 text-gray-600 hover:text-primary cursor-pointer"
                disabled={quantity >= product?.quantity}
                onClick={() =>
                  setQuantity((q) => Math.min(product?.quantity, q + 1))
                }
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product?.quantity} available
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6 flex justify-between items-center">
          <span className="text-muted-foreground">Total Price:</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button
            disabled={isLoading}
            onClick={() => addToCart(product._id)}
            className="flex-1 rounded-xl py-6 shadow-lg shadow-primary/25 cursor-pointer hover:bg-primary/80"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            className="flex-1 rounded-xl py-6 bg-gray-900 text-white hover:bg-primary/80 cursor-pointer"
          >
            <FaBolt className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </div>

        {/* Wishlist & Share */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className={cn(
              "flex-1 p-5 border-2 gap-2 cursor-pointer",
              wishListed
                ? "bg-[#FEF2F2] text-[#d12a2a]  hover:text-[#d12a2a] hover:bg-[#FEF2F2] border-[#f2cfcf]"
                : "border-gray-200 text-gray-700 hover:border-primary/30 hover:text-primary",
            )}
            onClick={() => {
              {
                wishListed
                  ? removeFromWishList(product._id)
                  : addToWishList(product._id);
              }
              setWishListed((w) => !w);
            }}
            disabled={addingToWishlist || removingFromWishlist}
          >
            <Heart className={cn("w-4 h-4", wishListed && "fill-red-600")} />
            {wishListed ? "In WishListed" : "Add to Wishlist"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-2 cursor-pointer border-gray-200 text-gray-700 hover:border-primary/30 hover:text-primary h-auto w-14"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Perks */}
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {perks.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
