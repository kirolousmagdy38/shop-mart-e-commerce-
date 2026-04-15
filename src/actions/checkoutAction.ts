"use server"

import { config } from "@/config";
import getUserToken from "@/lib/helperfunctions/getUserToken";
import { CheckoutFormData, CreateOrderResponse } from "@/types/checkout";

export async function createOrder(
  cartId: string,
  body: CheckoutFormData,
): Promise<CreateOrderResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(body),
  });

  const data: CreateOrderResponse = await response.json();

  if (!response.ok || data.status !== "success") {
    throw new Error(data.message ?? "Failed to create order");
  }

  return data;
}
