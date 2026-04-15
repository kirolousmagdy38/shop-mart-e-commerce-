import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-5 h-5",
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-muted text-muted-foreground",
          )}
        />
      ))}
    </div>
  );
}
