import { config } from "@/config";
import {
  CategoriesResponse,
  CategoryResponse,
  Category,
} from "@/types/categories";
import { Subcategory } from "@/types/product";
import { SubcategoriesResponse, SubcategoryResponse } from "@/types/subcategory";

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(`${config.baseUrl}/api/v1/categories`);
  const data: CategoriesResponse = await response.json();
  return data.data;
}

export async function getSpecificCategory(
  categoryId: string,
): Promise<Category> {
  const response = await fetch(
    `${config.baseUrl}/api/v1/categories/${categoryId}`,
  );
  const result: CategoryResponse = await response.json();
  return result.data;
}



export async function getAllSubcategories(): Promise<Subcategory[]> {
  const response = await fetch(`${config.baseUrl}/api/v1/subcategories`);
  const data: SubcategoriesResponse = await response.json();
  return data.data;
}


export async function getSubcategories(
  categoryId: string,
): Promise<Subcategory[]> {
  const response = await fetch(
    `${config.baseUrl}/api/v1/categories/${categoryId}/subcategories`,
  );
  const data: SubcategoriesResponse = await response.json();
  return data.data;
}

export async function getSpecificSubcategory(
  subCategoryId: string,
): Promise<Subcategory> {
  const response = await fetch(
    `${config.baseUrl}/api/v1/subcategories/${subCategoryId}`,
  );
  const result: SubcategoryResponse = await response.json();
  return result.data;
}
