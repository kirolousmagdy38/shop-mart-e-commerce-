import { config } from "@/config";
import { BrandResponse, BrandsListResponse } from "@/types/brand";
import { Brand } from "@/types/product";


export async function getAllBrands(): Promise<Brand[]> {
  const response = await fetch(`${config.baseUrl}/api/v1/brands`);
  const data: BrandsListResponse = await response.json();
  return data.data;
}

export async function getSpecificBrand(brandId: string): Promise<Brand> {
  const response = await fetch(`${config.baseUrl}/api/v1/brands/${brandId}`);
  const result: BrandResponse = await response.json();
  return result.data;
}
