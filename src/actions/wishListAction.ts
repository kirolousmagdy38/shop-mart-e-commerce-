"use server"

import { config } from "@/config";
import getUserToken from "@/lib/helperfunctions/getUserToken";
import {
  WishListIdsResponse,
  WishListProductsResponse,
} from "@/types/wishlist";

export async function addProductToWishList(
  productId: string,
): Promise<WishListIdsResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v1/wishlist`, {
    method: "POST",
    body: JSON.stringify({
      productId,
    }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data: WishListIdsResponse = await response.json();
  return data;
}

export async function removeProductFromWishlist(
  productId: string,
): Promise<WishListIdsResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(
    `${config.baseUrl}/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",

      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  const data: WishListIdsResponse = await response.json();
  return data;
}

export async function getWishList(): Promise<WishListProductsResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v1/wishlist`, {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data: WishListProductsResponse = await response.json();
  return data;
}
