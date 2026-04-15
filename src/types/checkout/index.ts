

export type PaymentMethod = "cash" | "online";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
}

export interface FormErrors {
  city?: string;
  details?: string;
  phone?: string;
  postalCode?: string;
}



export interface OrderItem {
  id: string;
  name: string;
  image: string;
  qty: number;
  price: number;
}


export interface ApiUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ApiSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ApiBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ApiProduct {
  subcategory: ApiSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: ApiCategory;
  brand: ApiBrand;
  ratingsAverage: number;
  id: string;
}

export interface ApiCartItem {
  count: number;
  _id: string;
  product: ApiProduct;
  price: number;
}

export interface ApiOrderData {
  shippingAddress: ShippingAddress & { postalCode?: string };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: PaymentMethod;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: ApiUser;
  cartItems: ApiCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface ApiPricing {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
}

export interface CreateOrderResponse {
  status: "success" | "error" | "fail";
  message: string;
  user: Pick<ApiUser, "_id" | "name" | "email">;
  pricing: ApiPricing;
  data: ApiOrderData;
}