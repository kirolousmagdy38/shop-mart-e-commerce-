import { ShieldCheck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StarRating from "../shared/StarRating";

interface ReviewCardProps {
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  comment: string;
  productName?: string;
  verified?: boolean;
}


export default function ReviewCard({
  author,
  rating,
  date,
  comment,
  productName,
  verified = false,
}: ReviewCardProps) {
  const initials = author.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm max-w-sm">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm">
                {author.name}
              </span>
              {verified && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs text-muted-foreground bg-transparent border-0 px-0"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={rating} />
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
          </div>
        </div>

        {/* Comment */}
        <p className="text-sm text-gray-700 leading-relaxed">{comment}</p>

        {/* Product */}
        {productName && (
          <>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Product: {productName}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
