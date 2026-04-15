import ProductDetailTabs from "@/components/product/ProductDetailsTab";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { getSpecificProduct } from "@/services/productsApi";


type ProductDetailsProps = {
  params: Promise<{
    productId: string;
  }>;
};
export default async function ProductDetails({ params }: ProductDetailsProps) {
  const {productId} = await params
  console.log(productId);
  const ProductDetails = await getSpecificProduct(productId);
  console.log(ProductDetails);

  return (
    <div className="container mx-auto">
      <div className="flex   items-start gap-4">
        <ProductImageGallery
          className=" sticky top-4 space-y-3 self-center"
          images={ProductDetails?.images}
        />
        <ProductInfo product={ProductDetails} />
      </div>
      <ProductDetailTabs product={ProductDetails} />
    </div>
  );
}
