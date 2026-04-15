"use client";

import { useState } from "react";
import {
  Trash2,
  TriangleAlert,
  ShoppingCart,
  PackageX,
  Heart,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const variantConfig = {
  remove: {
    icon: ShoppingCart,
    title: "Remove from Cart?",
    description: "This item will be removed from your shopping cart.",
    warning: "You can always add this item back to your cart later.",
    confirmLabel: "Yes, Remove",
    loadingLabel: "Removing...",
    cancelLabel: "Keep Item",
    showProductPreview: true,
  },
  clearAll: {
    icon: PackageX,
    title: "Clear Entire Cart?",
    description: "All items will be removed from your shopping cart at once.",
    warning:
      "This will remove all items. You'll need to add them again manually.",
    confirmLabel: "Yes, Clear All",
    loadingLabel: "Clearing...",
    cancelLabel: "Keep Cart",
    showProductPreview: false,
  },
  removeWishlist: {
    icon: Heart,
    title: "Remove from Wishlist?",
    description: "This item will be removed from your wishlist.",
    warning: "You can always save this item to your wishlist again later.",
    confirmLabel: "Yes, Remove",
    loadingLabel: "Removing...",
    cancelLabel: "Keep in Wishlist",
    showProductPreview: true,
  },
} as const;

export type DeleteModalVariant = keyof typeof variantConfig;

interface DeleteCartModalProps {
  variant?: DeleteModalVariant;
  productName?: string;
  productImage?: string;
  productPrice?: number;
  onConfirm: () => void | Promise<void>;
  trigger?: React.ReactNode;
}

export default function DeleteCartModal({
  variant = "remove",
  productName,
  productImage,
  productPrice,
  onConfirm,
  trigger,
}: DeleteCartModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = variantConfig[variant];
  const Icon = config.icon;

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  const defaultTrigger = {
    remove: (
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5"
      >
        <Trash2 className="w-4 h-4" />
        Remove
      </Button>
    ),
    clearAll: (
      <Button
        variant="outline"
        size="sm"
        className="border-destructive/40 text-destructive hover:bg-destructive/10 gap-1.5"
      >
        <PackageX className="w-4 h-4" />
        Clear Cart
      </Button>
    ),
    removeWishlist: (
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5"
      >
        <Heart className="w-4 h-4" />
        Remove
      </Button>
    ),
  }[variant];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden gap-0">
        {/* Red top accent */}
        <div className="h-1.5 w-full bg-destructive" />

        <div className="p-6">
          <DialogHeader className="items-center text-center gap-4 mb-5">
            {/* Pulsing icon */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-20 h-20 rounded-full bg-destructive/10 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {config.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {config.description}
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Product preview — only for variants with showProductPreview: true */}
          {config.showProductPreview && productName && (
            <div className="flex items-center gap-3 bg-muted/50 border border-gray-100 rounded-xl p-3 mb-5">
              {productImage ? (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                  {productName}
                </p>
                {productPrice !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    {productPrice.toFixed(2)} EGP
                  </p>
                )}
              </div>
              <Trash2 className="w-4 h-4 text-destructive shrink-0" />
            </div>
          )}

          {/* Warning note */}
          <div className="flex items-start gap-2 bg-destructive/5 border border-destructive/20 rounded-xl px-3 py-2.5 mb-5">
            <TriangleAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-destructive leading-relaxed">
              {config.warning}
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl h-11"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {config.cancelLabel}
            </Button>
            <Button
              variant="destructive"
              className="flex-1 rounded-xl h-11 gap-2"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {config.loadingLabel}
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  {config.confirmLabel}
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
