"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  BanknoteIcon,
  MapPinIcon,
  PhoneIcon,
  BuildingIcon,
  InfoIcon,
  CheckIcon,
  PackageIcon,
  ShoppingBagIcon,
  ReceiptIcon,
  HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FormErrors, PaymentMethod } from "@/types/checkout";
import { CartResponse } from "@/types/cart";
import { createOrder } from "@/actions/checkoutAction";
import { getCart } from "@/actions/cartAction";
import { toast } from "sonner";
import { CartContext } from "@/contexts/CartContext";
import { checkout } from "@/actions/ordersAction";

interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface CartItem {
  _id: string;
  product: CartProduct;
  count: number;
  price: number;
}

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [cartId, setCartId] = useState("");
  const { setNumOfCartItems } = useContext(CartContext);
  useEffect(() => {
    async function fetchCart() {
      try {
        setCartLoading(true);
        const response: CartResponse = await getCart();
        setCartId(response.cartId);
        setCartItems((response.data?.products as unknown as CartItem[]) ?? []);
      } catch (err) {
        setCartError(
          err instanceof Error ? err.message : "Failed to load cart items.",
        );
      } finally {
        setCartLoading(false);
      }
    }
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.count * item.price,
    0,
  );

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (city.trim().length < 2)
      newErrors.city = "City name must be at least 2 characters";
    if (details.trim().length < 10)
      newErrors.details = "Address details must be at least 10 characters";
    if (!/^01[0-9]{9}$/.test(phone.trim()))
      newErrors.phone = "Please enter a valid Egyptian phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;
    setIsSubmitting(true);

    const shippingAddress = {
      details: details.trim(),
      phone: phone.trim(),
      city: city.trim(),
      ...(postalCode.trim() && { postalCode: postalCode.trim() }),
    };

    try {
      if (paymentMethod === "cash") {
       
        const response = await createOrder(cartId, { shippingAddress });
        setNumOfCartItems(0); 
        toast.success(response.message || "Order placed successfully!");
        router.replace("/products");
      } else {
       
        const response = await checkout({ shippingAddress }, cartId);
        if (response?.session?.url) {
      
          window.location.href = response.session.url;
        } else {
          throw new Error(
            response?.message || "Failed to start payment session",
          );
        }
      }
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  const CartSummaryContent = () => {
    if (cartLoading) {
      return (
        <div className="space-y-3 mb-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 animate-pulse"
            >
              <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-12 shrink-0" />
            </div>
          ))}
        </div>
      );
    }

    if (cartError) {
      return (
        <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
          {cartError}
        </div>
      );
    }

    if (cartItems.length === 0) {
      return (
        <div className="mb-5 p-6 flex flex-col items-center gap-2 text-gray-400">
          <ShoppingBagIcon className="size-8" />
          <p className="text-sm">Your cart is empty.</p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-56 mb-5 pr-1">
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.count} × {item.price} EGP
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900 shrink-0">
                {(item.count * item.price).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/cart" className="hover:text-primary transition">
            Cart
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-linear-to-br from-primary to-primary/80 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ReceiptIcon className="size-5" />
              </span>
              Complete Your Order
            </h1>
            <p className="text-gray-500 mt-2">
              Review your items and complete your purchase
            </p>
          </div>
          <Link
            href="/cart"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/5 transition-all"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Cart
          </Link>
        </div>

        {/* Global API Error */}
        {apiError && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <span className="text-red-500 mt-0.5">⚠</span>
            <p className="text-sm font-medium">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Card */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-primary to-primary/80 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <HomeIcon className="size-5" />
                    Shipping Address
                  </h2>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Info banner */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <InfoIcon className="size-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Delivery Information
                      </p>
                      <p className="text-xs text-blue-600 mt-0.5">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-semibold text-gray-700"
                    >
                      City <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <BuildingIcon className="size-4 text-gray-500" />
                      </div>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={cn(
                          "pl-14 py-3.5 rounded-xl border-2 focus:ring-2 h-auto",
                          errors.city
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-primary/10",
                        )}
                      />
                    </div>
                    {errors.city && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="details"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MapPinIcon className="size-4 text-gray-500" />
                      </div>
                      <Textarea
                        id="details"
                        name="details"
                        rows={3}
                        placeholder="Street name, building number, floor, apartment..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className={cn(
                          "pl-14 py-3.5 rounded-xl border-2 focus:ring-2 resize-none",
                          errors.details
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-primary/10",
                        )}
                      />
                    </div>
                    {errors.details && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.details}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <PhoneIcon className="size-4 text-gray-500" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={cn(
                          "pl-14 pr-36 py-3.5 rounded-xl border-2 focus:ring-2 h-auto",
                          errors.phone
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-primary/10",
                        )}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Postal Code (optional) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="postalCode"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Postal Code{" "}
                      <span className="text-gray-400 font-normal text-xs">
                        (optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <PackageIcon className="size-4 text-gray-500" />
                      </div>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        placeholder="e.g. 12345"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="pl-14 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-primary to-primary/80 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCardIcon className="size-5" />
                    Payment Method
                  </h2>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    Choose how you'd like to pay
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={cn(
                      "w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group",
                      paymentMethod === "cash"
                        ? "border-primary bg-linear-to-r from-primary/5 to-primary/10 shadow-sm"
                        : "border-gray-200 hover:border-primary/30 hover:bg-gray-50",
                    )}
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                        paymentMethod === "cash"
                          ? "bg-linear-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/30"
                          : "bg-gray-100 text-gray-400 group-hover:bg-gray-200",
                      )}
                    >
                      <BanknoteIcon className="size-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-gray-900">
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-all border-2",
                        paymentMethod === "cash"
                          ? "bg-primary border-primary text-white"
                          : "border-gray-200",
                      )}
                    >
                      {paymentMethod === "cash" && (
                        <CheckIcon className="size-3" />
                      )}
                    </div>
                  </button>

                  {/* Pay Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={cn(
                      "w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group",
                      paymentMethod === "online"
                        ? "border-primary bg-linear-to-r from-primary/5 to-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-primary/30 hover:bg-gray-50",
                    )}
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                        paymentMethod === "online"
                          ? "bg-linear-to-br from-primary to-blue-600 text-white shadow-lg shadow-primary/30"
                          : "bg-gray-100 text-gray-400 group-hover:bg-gray-200",
                      )}
                    >
                      <CreditCardIcon className="size-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3
                        className={cn(
                          "font-bold",
                          paymentMethod === "online"
                            ? "text-primary"
                            : "text-gray-900",
                        )}
                      >
                        Pay Online
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src="https://img.icons8.com/color/48/visa.png"
                          alt="Visa"
                          width={32}
                          height={20}
                          className="h-5 w-auto"
                        />
                        <img
                          src="https://img.icons8.com/color/48/mastercard.png"
                          alt="Mastercard"
                          width={32}
                          height={20}
                          className="h-5 w-auto"
                        />
                        <img
                          src="https://img.icons8.com/color/48/amex.png"
                          alt="Amex"
                          width={32}
                          height={20}
                          className="h-5 w-auto"
                        />
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-all border-2",
                        paymentMethod === "online"
                          ? "bg-primary border-primary text-white"
                          : "border-gray-200",
                      )}
                    >
                      {paymentMethod === "online" && (
                        <CheckIcon className="size-3" />
                      )}
                    </div>
                  </button>

                  {/* Security badge */}
                  <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <ShieldCheckIcon className="size-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Secure &amp; Encrypted
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                <div className="bg-linear-to-r from-primary to-primary/80 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingBagIcon className="size-5" />
                    Order Summary
                  </h2>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    {cartLoading
                      ? "Loading…"
                      : `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`}
                  </p>
                </div>

                <div className="p-5">
                  {/* Dynamic cart items */}
                  <CartSummaryContent />

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {subtotal.toLocaleString()} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <TruckIcon className="size-4 text-gray-400" />
                        Shipping
                      </span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">
                          {subtotal.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || cartLoading || cartItems.length === 0
                    }
                    className="w-full mt-6 bg-linear-to-r from-primary to-primary/80 text-white py-4 rounded-xl font-bold hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] h-auto gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheckIcon className="size-4" />
                        {paymentMethod === "online"
                          ? "Proceed to Payment"
                          : "Place Order"}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <ShieldCheckIcon className="size-3.5 text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <TruckIcon className="size-3.5 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <PackageIcon className="size-3.5 text-orange-500" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
