"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface ProductImageGalleryProps {
  images: string[];
  className?: string;
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const validImages = images?.filter((image) => image && image.trim() !== "");

  if (!validImages || validImages.length === 0) {
    return (
      <div className="lg:w-1/4 w-3/4 sticky top-4 self-center">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="aspect-square bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, validImages.length - 1);

  return (
    <div className="lg:w-1/4 w-3/4 sticky top-4 self-center">
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg aspect-square">
          <Image
            src={validImages[safeIndex]}
            alt={`Product image ${safeIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
            priority={safeIndex === 0}
            loading="eager"
          />
        </div>

        {/* Thumbnails */}
        <nav
          className="flex gap-2 flex-wrap justify-center"
          aria-label="Thumbnail Navigation"
        >
          {validImages.map((src, index) => (
            <Button
              key={index}
              type="button"
              aria-label={`Go to Slide ${index + 1}`}
              aria-pressed={safeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 shrink-0 cursor-pointer",
                safeIndex === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-primary/40",
              )}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
