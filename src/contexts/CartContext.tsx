"use client";

import { getCart } from "@/actions/cartAction";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext<{
  numOfCartItems: number;
  setNumOfCartItems: Dispatch<SetStateAction<number>>;
  isCartLoading: boolean;
}>({
  numOfCartItems: 0,
  setNumOfCartItems: () => {},
  isCartLoading: true,
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isCartLoading, setIsCartLoading] = useState(false);
  async function getUserCart() {
    try {
      setIsCartLoading(true);
      const response = await getCart();
     

      setNumOfCartItems(response.numOfCartItems);
    } catch (error) {
    
    } finally {
      setIsCartLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);
  return (
    <CartContext.Provider
      value={{ numOfCartItems, setNumOfCartItems, isCartLoading }}
    >
      {children}
    </CartContext.Provider>
  );
}
