
import ProductCard from "@/components/product/ProductCard";
import PageHero from "@/components/shared/PageHero";
import { getProducts } from "@/services/productsApi";
import { Product } from "@/types/product";
import { PackageOpen } from "lucide-react";

interface Props {
  searchParams: Promise<{ subcategory?: string; brand?: string }>;
}

export default async function Products({ searchParams }: Props) {
  const { subcategory, brand } = await searchParams;
  const products = await getProducts({ subcategory, brand });

  return (
    <div>
      <PageHero
        title={
          brand
            ? "Brand Products"
            : subcategory
              ? "Filtered Products"
              : "All Products"
        }
        description={
          brand
            ? "Browsing products from selected brand"
            : subcategory
              ? "Browsing products in selected subcategory"
              : "Explore our complete product collection"
        }
        icon={<PackageOpen className="w-8 h-8 text-primary-foreground" />}
      />
      <div className="container mx-auto py-10">
        <div className="mb-6 text-gray-500 font-bold text-lg">
          Showing {products.length} products
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product: Product) => (
            <div key={product._id}>
              <ProductCard
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
