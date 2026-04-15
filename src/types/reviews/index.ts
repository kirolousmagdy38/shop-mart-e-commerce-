import { ApiResponse } from "../common";

export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  rating: number;
  review: string;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
}

export type ReviewsResponse = ApiResponse<Review[]>;
export type ReviewResponse = ApiResponse<Review>;
