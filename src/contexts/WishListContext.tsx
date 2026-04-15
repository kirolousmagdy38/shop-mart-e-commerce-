"use client";
import { getWishList } from "@/actions/wishListAction";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const WishListContext = createContext<{
  numOfWishListItems: number;
  setNumOfWishListItems: Dispatch<SetStateAction<number>>;
  isWishListLoading: boolean;
}>({
  numOfWishListItems: 0,
  setNumOfWishListItems: () => {},
  isWishListLoading: true,
});

export default function WishListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numOfWishListItems, setNumOfWishListItems] = useState(0);
  const [isWishListLoading, setIsWishListLoading] = useState(false);

  async function getUserWishList() {
    try {
      setIsWishListLoading(true);
      const response = await getWishList();
      console.log("wishlist response:", response);
      setNumOfWishListItems(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setIsWishListLoading(false);
    }
  }
  useEffect(() => {
    getUserWishList();
  }, []);
  return (
    <WishListContext.Provider
      value={{
        numOfWishListItems,
        setNumOfWishListItems,
        isWishListLoading,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
