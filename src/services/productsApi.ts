
import { config } from "@/config";
import { Product, ProductResponse, ProductsResponse } from "@/types/product";

interface GetProductsParams {
  subcategory?: string;
  brand?: string;
}

export async function getProducts({
  subcategory,
  brand,
}: GetProductsParams = {}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (subcategory) searchParams.set("subcategory", subcategory);
  if (brand) searchParams.set("brand", brand);

  const query = searchParams.toString();
  const url = `${config.baseUrl}/api/v1/products${query ? `?${query}` : ""}`;

  const response = await fetch(url);
  const data: ProductsResponse = await response.json();
  return data.data;
}

export async function getSpecificProduct(productId: string): Promise<Product> {
  const response = await fetch(
    `${config.baseUrl}/api/v1/products/${productId}`,
  );
  const result: ProductResponse = await response.json();
  return result.data;
}
