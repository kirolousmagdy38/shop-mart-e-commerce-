import { Product } from "../product";

export interface WishListIdsResponse {
  status: string;
  message: string;
  data: WishListIds;
}

export interface WishListProductsResponse {
  status: string;
  count: number;
  data: WishListProducts;
}

type WishListIds = string[];

type WishListProducts = Product[];
