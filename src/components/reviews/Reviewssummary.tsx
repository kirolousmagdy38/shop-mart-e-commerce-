
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import StarRating from "../shared/StarRating";

import ReviewDisplayServer from "./ReviewDisplayServer";

interface ReviewsSummaryProps {
  average: number;
  total: number;
  productId:string;
  breakdown?: { stars: number; percentage: number }[];
}

const defaultBreakdown = [
  { stars: 5, percentage: 60 },
  { stars: 4, percentage: 25 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 5 },
  { stars: 1, percentage: 5 },
];

export default function ReviewsSummary({
  average,
  total,
  productId,
  breakdown = defaultBreakdown,
}: ReviewsSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Summary Row */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Score */}
        <div className="text-center shrink-0">
          <div className="text-5xl font-bold text-gray-900 mb-2">{average}</div>
          <StarRating rating={average} />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {total} reviews
          </p>
        </div>

        {/* Breakdown Bars */}
        <div className="flex-1 w-full space-y-2">
          {breakdown.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-10 shrink-0">
                {stars} star
              </span>
              <Progress
                value={percentage}
                className="flex-1 h-2 bg-gray-200 [&>div]:bg-yellow-400"
              />
              <span className="text-sm text-muted-foreground w-9 text-right shrink-0">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List Placeholder */}
      <Separator />
    
        <ReviewDisplayServer productId={productId} />
      
     
      <Button
        className="text-white bg-black p-5 w-4xl mx-auto flex justify-center
      items-center cursor-pointer hover:bg-black/80 hover:-translate-y-1"
      >
        Write a Review
      </Button>
    </div>
  );
}
