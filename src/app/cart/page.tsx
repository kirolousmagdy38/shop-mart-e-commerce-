import ShoppingCart from "@/components/cart/ShoppingCart";
import { getCart } from "@/actions/cartAction";

export default async function Cart() {
  const data = await getCart();

  return (
    <div>
      <ShoppingCart cart={data} />
    </div>
  );
}
