
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface SubcategoryMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface SubcategoriesResponse {

  results: number;
  metadata: SubcategoryMetadata;
  data: Subcategory[];
}

export interface SubcategoryResponse {

  data: Subcategory;
}
