import { config } from "@/config";
import { registerSchemaType } from "@/schemas/register.schema";
import { AuthResponse } from "@/types/auth";

export async function signUp(body: registerSchemaType): Promise<AuthResponse> {
  const response = await fetch(`${config.baseUrl}/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
   
    throw new Error(data?.message || "Registration failed");
  }

  return data as AuthResponse;
}
export async function signIN(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(`${config.baseUrl}/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: AuthResponse = await response.json();
  return data;
}
