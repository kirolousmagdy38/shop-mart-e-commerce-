const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("BASE URL is not defined in environment variables");
}

export const config = {
  baseUrl,
};
