
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



const authRoutes = ["/auth/signin", "/auth/register"]; 

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));


  if (token?.token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (!token?.token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile/:path*",
    // Auth routes
    "/auth/signin",
    "/auth/register",
  ],
};
