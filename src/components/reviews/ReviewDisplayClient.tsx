"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ReviewCard from "./ReviewCard";
import { Review } from "@/types/reviews";
import { formatRelativeDate } from "@/lib/helperfunctions/formatRelativeDate";

type ReviewDisplayProp = {
  reviews: Review[];
};
export default function ReviewDisplayClient({ reviews }: ReviewDisplayProp) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-2xl px-10"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {reviews?.map((review, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <ReviewCard
                    author={review.user}
                    comment={review.review}
                    rating={review.rating}
                    date={formatRelativeDate(review.createdAt)}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}
