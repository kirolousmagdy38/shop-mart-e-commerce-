"use client";

import {
  ShoppingCart as ShoppingCartIcon,
  Tag,
  Lock,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CartResponse } from "@/types/cart";
import formatPrice from "@/lib/helperfunctions/formatPrice";
import {
  clearUserCart,
  removeProductFromCart,
  updateProductQuantity,
} from "@/actions/cartAction";
import CartProduct from "./CartProduct";
import DeleteCartModal from "../shared/DeleteModal";
import { toast } from "sonner";
import { CartContext } from "@/contexts/CartContext";

const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  FRESH20: 20,
  WELCOME15: 15,
};

const FREE_SHIPPING_THRESHOLD = 1000;

export default function ShoppingCart({ cart }: { cart: CartResponse }) {
  const [innerCart, setInnerCart] = useState<CartResponse>(cart);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);

  const { setNumOfCartItems } = useContext(CartContext);
  useEffect(() => {
    setNumOfCartItems(innerCart.numOfCartItems);
  }, [innerCart]);

  async function removeItem(id: string) {
    try {
      const response = await removeProductFromCart(id);
      setInnerCart(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      const response = await clearUserCart();
      setInnerCart(response);
      toast.success("Cart Cleared Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Clear Cart");
    }
  }

  async function updateQuantity(productId: string, count: number) {
    try {
      const response = await updateProductQuantity(productId, count);
      setInnerCart(response);
    } catch (error) {
      console.log(error);
    }
  }
  const subtotal = innerCart?.data?.products.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : 9.99;
  const discountAmount = appliedPromo
    ? (subtotal * appliedPromo.discount) / 100
    : 0;
  const total = subtotal + shipping - discountAmount;

  function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError("Please enter a promo code.");
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, discount: PROMO_CODES[code] });
      setPromoError("");
      setPromoOpen(false);
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code. Try SAVE10, FRESH20, or WELCOME15.");
      setAppliedPromo(null);
    }
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  }
  console.log(innerCart?.numOfCartItems);

  if (innerCart?.numOfCartItems === 0) {
    return (
      <section className="py-20">
        <div className="container max-w-lg text-center mx-auto">
          <h1 className="mb-4 text-4xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Cart Items ── */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCart?.data?.products.map((item) => (
                <CartProduct
                  key={item._id}
                  item={item}
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
            {innerCart?.numOfCartItems > 0 && (
              <DeleteCartModal
                variant="clearAll"
                onConfirm={() => clearCart()}
                trigger={
                  <button className="flex items-center  font-medium text-destructive my-6 border border-destructive/30 bg-destructive/5 hover:bg-destructive hover:text-white px-4 py-2 rounded-xl transition-all duration-200">
                    Clear All Items
                  </button>
                }
              />
            )}
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
              {/* Header */}
              <div className="bg-primary px-6 py-4">
                <h2 className="text-lg font-bold text-primary-foreground flex items-center gap-2">
                  <ShoppingCartIcon className="w-5 h-5" />
                  Order Summary
                </h2>
                <p className="text-sm text-primary-foreground/80 mt-0.5">
                  {innerCart?.numOfCartItems}{" "}
                  {innerCart?.numOfCartItems === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Free Shipping Banner */}
                {isFreeShipping && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-700">
                        Free Shipping!
                      </p>
                      <p className="text-xs text-green-600">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span
                      className={
                        isFreeShipping ? "text-green-600 font-semibold" : ""
                      }
                    >
                      {isFreeShipping ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        Promo ({appliedPromo.code})
                        <button
                          onClick={removePromo}
                          className="ml-1 text-xs text-muted-foreground hover:text-destructive underline"
                        >
                          Remove
                        </button>
                      </span>
                      <span>−{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {/* Promo Code */}
                {!appliedPromo && (
                  <div>
                    {!promoOpen ? (
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-dashed gap-2 text-muted-foreground hover:text-primary hover:border-primary"
                        onClick={() => setPromoOpen(true)}
                      >
                        <Tag className="w-4 h-4" />
                        Apply Promo Code
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                              setPromoError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                applyPromo();
                              }
                            }}
                            placeholder="Enter promo code"
                            className="rounded-xl uppercase"
                          />
                          <Button
                            onClick={applyPromo}
                            className="rounded-xl shrink-0"
                          >
                            Apply
                          </Button>
                        </div>
                        {promoError && (
                          <p className="text-xs text-destructive">
                            {promoError}
                          </p>
                        )}
                        <button
                          onClick={() => {
                            setPromoOpen(false);
                            setPromoCode("");
                            setPromoError("");
                          }}
                          className="text-xs text-muted-foreground hover:text-foreground underline w-full text-center"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Checkout Button */}
                <Button size="lg" className="w-full rounded-xl gap-2" asChild>
                  <Link href="/checkout">
                    <Lock className="w-4 h-4" />
                    Secure Checkout
                  </Link>
                </Button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    Secure Payment
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-primary" />
                    Fast Delivery
                  </span>
                </div>

                {/* Continue Shopping */}
                <div className="text-center">
                  <Link
                    href="/products"
                    className="text-sm text-primary hover:underline"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
