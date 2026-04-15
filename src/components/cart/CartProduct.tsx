"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import formatPrice from "@/lib/helperfunctions/formatPrice";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Link from "next/link";
import { CartProduct as ICartProduct } from "@/types/cart";
import { toast } from "sonner";
import DeleteCartItemModal from "../shared/DeleteModal";

export default function CartProduct({
  item,
  removeItem,
  updateQuantity,
}: {
  item: ICartProduct;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);
  async function handleUpdateQuantity(count: number) {
    try {
      if (item.count < count) {
        setIsIncreasing(true);
      } else {
        setIsDecreasing(true);
      }
      setIsLoading(true);
      await updateQuantity(item.product._id, count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsIncreasing(false);
      setIsDecreasing(false);
    }
  }

  async function handleRemoveItem(productId: string) {
    try {
      await removeItem(productId);
      toast.success("Item Removed from Cart ");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Remove Item from Cart");
    }
  }

  return (
    <div key={item._id} className="flex gap-4 rounded-lg border bg-card p-4">
      <div className="w-24 shrink-0">
        <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted">
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/products/${item.product._id}`}>
            <h3 className="font-medium">{item.product.title}</h3>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={item.count == 1 || isLoading}
            onClick={() => handleUpdateQuantity(item.count - 1)}
          >
            {isDecreasing ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Minus className="size-3" />
            )}
          </Button>
          <span className="w-8 text-center">{item.count}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handleUpdateQuantity(item.count + 1)}
            disabled={isLoading}
          >
            {isIncreasing ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Plus className="size-3" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="font-semibold">
            {formatPrice(item.price * item.count)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatPrice(item.price)} each
          </p>
        </div>

        <DeleteCartItemModal
          variant="remove"
          productName={item.product.title}
          productImage={item.product.imageCover}
          productPrice={item.price}
          onConfirm={() => handleRemoveItem(item.product._id)}
        />
      </div>
    </div>
  );
}
