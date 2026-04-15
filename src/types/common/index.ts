

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export type ApiResponse<T> = {
  results: number;
  metadata: PaginationMetadata;
  data: T;
};

export interface ErrorResponse {
  message: string;
  code: number;
}
