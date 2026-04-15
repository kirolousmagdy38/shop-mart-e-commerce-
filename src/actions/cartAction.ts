"use server"

import { config } from "@/config";
import getUserToken from "@/lib/helperfunctions/getUserToken";
import { CartResponse } from "@/types/cart";

export async function addProductToCart(
  productId: string,
): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${config.baseUrl}/api/v2/cart`, {
    body: JSON.stringify({
      productId: productId,
    }),
    method: "POST",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to cart");
  }

  const data: CartResponse = await response.json();
  return data;
}

export async function getCart(): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v2/cart`, {
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data: CartResponse = await response.json();
  return data;
}

export async function removeProductFromCart(
  productId: string,
): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data: CartResponse = await response.json();
  return data;
}

export async function clearUserCart(): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data: CartResponse = await response.json();
  return data;
}

export async function updateProductQuantity(
  productId: string,
  count: number,
): Promise<CartResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v2/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({
      count,
    }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data: CartResponse = await response.json();
  return data;
}
