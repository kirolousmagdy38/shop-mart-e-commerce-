
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CategoryMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: CategoryMetadata;
  data: Category[];
}

export interface CategoryResponse {
  data: Category;
}
