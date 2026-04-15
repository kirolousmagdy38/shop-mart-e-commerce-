"use server"

import { config } from "@/config";
import getUserToken from "@/lib/helperfunctions/getUserToken";

export async function checkout(body: any, cartId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(
    `${config.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  return data;
}
