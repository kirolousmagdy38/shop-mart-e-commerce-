import { getReviewsForProduct } from "@/services/reviewsApi";
import ReviewDisplayClient from "./ReviewDisplayClient";

export default async function ReviewDisplayServer({
  productId,
}: {
  productId: string;
}) {
  const reviews = await getReviewsForProduct(productId);
  console.log("reviews", reviews);

  return <div>{
    reviews.length>0 ?
    <ReviewDisplayClient reviews={reviews} />
  :"No Reviews yet"}</div>;
}
