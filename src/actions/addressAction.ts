"use server"

import { config } from "@/config";
import getUserToken from "@/lib/helperfunctions/getUserToken";
import {
  AddressesResponse,
  AddressResponse,
  PersonalDetails,
} from "@/types/address";

export async function addAddress(
  body: PersonalDetails,
): Promise<AddressResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v1/addresses`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  const data: AddressResponse = await response.json();
  return data;
}

export async function removeAddress(
  addressId: string,
): Promise<AddressResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(
    `${config.baseUrl}/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  const data: AddressResponse = await response.json();
  return data;
}

export async function getSpecificAddress(
  addressId: string,
): Promise<AddressResponse> {
  const token = await getUserToken();

  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(
    `${config.baseUrl}/api/v1/addresses/${addressId}`,
    {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  const data: AddressResponse = await response.json();
  return data;
}

export async function getAllAddresses(): Promise<AddressesResponse> {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await fetch(`${config.baseUrl}/api/v1/addresses`, {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  const data: AddressesResponse = await response.json();
  return data;
}
