import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/register",
        permanent: true,
      },

      {
        source: "/cart-page",
        destination: "/cart",
        permanent: true,
      },
      {
        source: "/wishlist-page",
        destination: "/wishlist",
        permanent: true,
      },

      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },

      {
        source: "/my-orders",
        destination: "/orders",
        permanent: true,
      },
      {
        source: "/account",
        destination: "/profile",
        permanent: true,
      },

      {
        source: "/shop",
        destination: "/products",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-brands/**",
      },
    ],
  },
};

export default nextConfig;
