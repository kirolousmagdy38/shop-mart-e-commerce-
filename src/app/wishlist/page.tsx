import MyWishList from "@/components/wishlist/MyWishList";
import { getWishList } from "@/actions/wishListAction";

export default async function Wishlist1() {
  const myWishList = await getWishList();

  return <MyWishList myWishList={myWishList} />;
}
