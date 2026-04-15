import { decode } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";

export default async function getUserToken() {
  const decodedToken =
    (await cookies()).get("next-auth.session-token")?.value ||
    (await cookies()).get("__Secure-next-auth.session-token")?.value;
  const userToken = await decode({
    token: decodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return userToken?.token;
}
