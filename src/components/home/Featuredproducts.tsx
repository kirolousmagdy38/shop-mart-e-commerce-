import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-black rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured{" "}
            <span className="text-black underline decoration-gray-300">
              Products
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              name={product.title}
              category={product.category.name}
              image={product.imageCover}
              price={product.priceAfterDiscount ?? product.price}
              discount={Math.round(
                ((product.price -
                  (product.priceAfterDiscount ?? product.price)) *
                  100) /
                  product.price,
              )}
              originalPrice={
                product.priceAfterDiscount ? product.price : undefined
              }
              rating={product.ratingsAverage}
              reviewCount={product.ratingsQuantity}
              href={`/products/${product._id}`}
              productId={product._id}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-5 font-semibold gap-2"
          >
            <Link href="/products">
              <ShoppingCart className="w-4 h-4" />
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
