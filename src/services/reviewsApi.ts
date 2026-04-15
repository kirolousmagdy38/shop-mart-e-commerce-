import { config } from "@/config";
import { Review, ReviewsResponse } from "@/types/reviews";

export async function getReviewsForProduct(
  productId: string,
): Promise<Review[]> {
  const response = await fetch(
    `${config.baseUrl}/api/v1/products/${productId}/reviews`,
  );
  const data: ReviewsResponse =await response.json();
  return data.data;
}
